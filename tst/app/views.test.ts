import { NextRequest } from 'next/server'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { GET, POST } from '@App/api/views/[slug]/route'

const mockOnce = vi.fn()
const mockTransaction = vi.fn()
const mockChild = vi.fn(() => ({ once: mockOnce, transaction: mockTransaction }))

vi.mock('@Modules/firebase', () => ({
    default: { ref: vi.fn(() => ({ child: mockChild })) }
}))

const makeRequest = () => new NextRequest('http://localhost/api/views/test-slug')
const makeParams = (slug: string) => ({ params: Promise.resolve({ slug }) })

describe('GET /api/views/[slug]', () => {
    beforeEach(() => {
        mockOnce.mockResolvedValue({ val: () => 42 })
    })

    it('returns the view count from Firebase', async () => {
        const res = await GET(makeRequest(), makeParams('test-slug'))
        expect(await res.json()).toEqual({ total: 42 })
    })

    it('reads from the correct slug', async () => {
        await GET(makeRequest(), makeParams('my-post'))
        expect(mockChild).toHaveBeenCalledWith('my-post')
    })
})

describe('POST /api/views/[slug]', () => {
    describe('in development', () => {
        beforeEach(() => { vi.stubEnv('NODE_ENV', 'development') })
        afterEach(() => { vi.unstubAllEnvs() })

        it('returns null without touching Firebase', async () => {
            const res = await POST(makeRequest(), makeParams('test-slug'))
            expect(await res.json()).toEqual({ total: null })
            expect(mockTransaction).not.toHaveBeenCalled()
        })
    })

    describe('in production', () => {
        beforeEach(() => {
            vi.stubEnv('NODE_ENV', 'production')
            mockTransaction.mockResolvedValue({ snapshot: { val: () => 43 } })
        })
        afterEach(() => { vi.unstubAllEnvs() })

        it('increments the view count and returns the new total', async () => {
            const res = await POST(makeRequest(), makeParams('test-slug'))
            expect(await res.json()).toEqual({ total: 43 })
            expect(mockTransaction).toHaveBeenCalled()
        })
    })
})
