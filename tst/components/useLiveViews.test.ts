import { describe, expect, it } from 'vitest'
import { resolveViews } from '@Components/blog/useLiveViews'

describe('resolveViews', () => {
    it('is null while loading', () => {
        expect(resolveViews({ status: 'loading' }, 'a', 10)).toBeNull()
    })

    it('uses the cached count when the live fetch failed', () => {
        expect(resolveViews({ status: 'failed' }, 'a', 10)).toBe(10)
    })

    it('uses the live count but never goes below the cached one', () => {
        expect(resolveViews({ status: 'ready', views: { a: 12 } }, 'a', 10)).toBe(12)
        expect(resolveViews({ status: 'ready', views: { a: 8 } }, 'a', 10)).toBe(10)
        expect(resolveViews({ status: 'ready', views: {} }, 'a', 10)).toBe(10)
    })
})
