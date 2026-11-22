import { describe, expect, it, vi } from 'vitest'
import { GET } from '@App/api/views/route'

const { getLifetimeViews } = vi.hoisted(() => ({ getLifetimeViews: vi.fn() }))
vi.mock('@Modules/views', () => ({ getLifetimeViews }))

describe('GET /api/views', () => {
    it('returns live counts, uncached', async () => {
        getLifetimeViews.mockResolvedValue({ 'a-post': 42 })
        const response = await GET()
        expect(getLifetimeViews).toHaveBeenCalledWith({ live: true })
        expect(response.headers.get('Cache-Control')).toBe('no-store')
        expect(await response.json()).toEqual({ views: { 'a-post': 42 } })
    })

    it('logs and returns 502 when Umami fails', async () => {
        const error = new Error('401 Unauthorized')
        const log = vi.spyOn(console, 'error').mockImplementation(() => {})
        getLifetimeViews.mockRejectedValue(error)
        expect((await GET()).status).toBe(502)
        expect(log).toHaveBeenCalledWith('Live views failed', error)
        log.mockRestore()
    })
})
