import { describe, expect, it, vi } from 'vitest'
import { getLifetimeViews } from '@Modules/views'

const { getPageviewsByPath } = vi.hoisted(() => ({ getPageviewsByPath: vi.fn() }))
vi.mock('@Modules/umami', () => ({ getPageviewsByPath }))
vi.mock('../../src/data/viewsBaseline.json', () => ({
    default: { cutoverAt: '2026-11-21T12:00:00.000Z', views: { 'old-post': 100, 'other-post': 5 } }
}))

describe('getLifetimeViews', () => {
    it('counts Umami views only from the cutover', async () => {
        getPageviewsByPath.mockResolvedValue({})
        await getLifetimeViews()
        expect(getPageviewsByPath).toHaveBeenCalledWith(Date.parse('2026-11-21T12:00:00.000Z'))
    })

    it('adds blog post pageviews to the baseline, folding trailing-slash paths together', async () => {
        getPageviewsByPath.mockResolvedValue({
            '/blog/old-post': 3,
            '/blog/old-post/': 2,
            '/blog/new-post': 7,
            '/blog': 50,
            '/blog/old-post/assets/banner.jpg': 9,
            '/uses': 40,
        })
        expect(await getLifetimeViews()).toEqual({ 'old-post': 105, 'other-post': 5, 'new-post': 7 })
    })
})
