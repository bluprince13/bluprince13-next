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
        expect(() => track('404', { path: '/missing' })).not.toThrow()
    })
})
