import { afterEach, describe, expect, it, vi } from 'vitest'
import { track } from '@Modules/analytics'

describe('track', () => {
    afterEach(() => {
        delete window.umami
    })

    it('forwards the event and data to Umami', () => {
        const umamiTrack = vi.fn()
        window.umami = { track: umamiTrack }

        track('search', { query: 'oci', results: 0 })

        expect(umamiTrack).toHaveBeenCalledWith('search', { query: 'oci', results: 0 })
    })

    it('does nothing when the tracker has not loaded', () => {
        expect(() => track('blog-filter', { tag: 'uk' })).not.toThrow()
    })
})

describe('track before the tracker loads', () => {
    afterEach(() => {
        vi.useRealTimers()
        delete window.umami
    })

    it('sends the event once the tracker appears', () => {
        vi.useFakeTimers()
        const umamiTrack = vi.fn()

        track('blog-filter', { tag: 'uk' })
        window.umami = { track: umamiTrack }
        vi.advanceTimersByTime(500)

        expect(umamiTrack).toHaveBeenCalledWith('blog-filter', { tag: 'uk' })
    })

    it('gives up if the tracker never loads', () => {
        vi.useFakeTimers()

        track('blog-filter', { tag: 'uk' })
        vi.runAllTimers()

        expect(vi.getTimerCount()).toBe(0)
    })
})
