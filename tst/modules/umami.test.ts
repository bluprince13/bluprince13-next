import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cacheableEndAt, getPageviewsByPath } from '@Modules/umami'

const fetchMock = vi.fn()

const respond = (body: unknown, ok = true) =>
    fetchMock.mockResolvedValue({ ok, status: ok ? 200 : 401, statusText: ok ? 'OK' : 'Unauthorized', json: async () => body })

describe('umami', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', fetchMock)
        vi.stubEnv('UMAMI_API_KEY', 'umami_test')
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.unstubAllEnvs()
        fetchMock.mockReset()
    })

    it('rounds the end of the range up to the hour', () => {
        const hour = 3600 * 1000
        expect(cacheableEndAt(5 * hour + 1)).toBe(6 * hour)
        expect(cacheableEndAt(5 * hour)).toBe(5 * hour)
    })

    it('requests expanded path metrics with the API key and an hourly revalidate', async () => {
        vi.useFakeTimers({ now: 3600 * 1000 + 1 })
        respond([{ name: '/blog/a', pageviews: 3, visitors: 2, visits: 2 }])

        const views = await getPageviewsByPath(1000)
        vi.useRealTimers()

        expect(views).toEqual({ '/blog/a': 3 })
        const [url, init] = fetchMock.mock.calls[0]
        expect(url).toMatch(/^https:\/\/metrics\.bluprince13\.com\/api\/websites\/[\w-]+\/metrics\/expanded\?/)
        expect(new URL(url).searchParams.get('startAt')).toBe('1000')
        expect(new URL(url).searchParams.get('endAt')).toBe(String(2 * 3600 * 1000))
        expect(new URL(url).searchParams.get('type')).toBe('path')
        expect(init.headers.Authorization).toBe('Bearer umami_test')
        expect(init.next).toEqual({ revalidate: 3600 })
    })

    it('bypasses the cache and counts up to now when live', async () => {
        vi.useFakeTimers({ now: 3600 * 1000 + 1 })
        respond([])

        await getPageviewsByPath(1000, { live: true })
        vi.useRealTimers()

        const [url, init] = fetchMock.mock.calls[0]
        expect(new URL(url).searchParams.get('endAt')).toBe(String(3600 * 1000 + 1))
        expect(init.cache).toBe('no-store')
        expect(init.next).toBeUndefined()
    })

    it('throws when the API fails', async () => {
        respond({}, false)
        await expect(getPageviewsByPath(0)).rejects.toThrow('401 Unauthorized')
    })

    it('throws on Vercel when no key is set', async () => {
        vi.stubEnv('UMAMI_API_KEY', '')
        vi.stubEnv('VERCEL', '1')
        await expect(getPageviewsByPath(0)).rejects.toThrow('UMAMI_API_KEY is not set')
        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('skips Umami locally when no key is set', async () => {
        vi.stubEnv('UMAMI_API_KEY', '')
        vi.stubEnv('VERCEL', '')
        expect(await getPageviewsByPath(0)).toEqual({})
        expect(fetchMock).not.toHaveBeenCalled()
    })
})
