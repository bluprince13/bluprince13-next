import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import PostViewCount from '@Components/blog/PostViewCount'

const fetchMock = vi.fn()

describe('PostViewCount', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', fetchMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        fetchMock.mockReset()
    })

    const settle = () => act(async () => {})

    it('shows a loading state, then the live count', async () => {
        fetchMock.mockResolvedValue({ ok: true, json: async () => ({ views: { 'a-post': 1255 } }) })
        const { container } = render(<PostViewCount slug="a-post" fallbackViews={1254} />)
        expect(container.querySelector('[aria-busy="true"]')).toBeTruthy()
        expect(screen.queryByText(/1,254/)).toBeNull()

        await settle()

        expect(fetchMock).toHaveBeenCalledWith('/api/views', expect.objectContaining({ cache: 'no-store' }))
        expect(screen.getByText('1,255 views')).toBeTruthy()
    })

    it('falls back to the server count when the live count fails', async () => {
        fetchMock.mockResolvedValue({ ok: false })
        render(<PostViewCount slug="a-post" fallbackViews={1254} />)
        await settle()
        expect(screen.getByText('1,254 views')).toBeTruthy()
    })

    it('falls back to the server count when the request errors', async () => {
        fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
        render(<PostViewCount slug="a-post" fallbackViews={1254} />)
        await settle()
        expect(screen.getByText('1,254 views')).toBeTruthy()
    })
})
