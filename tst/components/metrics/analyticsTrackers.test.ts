import { describe, expect, it } from 'vitest'
import { readDepth } from '@Components/blog/metrics/ReadProgress'
import { outboundUrl } from '@Components/metrics/OutboundLinkTracker'

describe('readDepth', () => {
    it('is 0 before the content reaches the bottom of the viewport', () => {
        expect(readDepth(1000, 2000, 800)).toBe(0)
    })

    it('is the share of content above the bottom of the viewport', () => {
        expect(readDepth(1000, 2000, 2000)).toBe(50)
    })

    it('caps at 100 once the content end is in view', () => {
        expect(readDepth(1000, 2000, 5000)).toBe(100)
    })

    it('is 0 for empty content', () => {
        expect(readDepth(1000, 0, 5000)).toBe(0)
    })
})

describe('outboundUrl', () => {
    it('returns host and path for links to other sites', () => {
        expect(outboundUrl('https://www.gov.uk/oci?utm=x#top', 'bluprince13.com')).toBe('www.gov.uk/oci')
    })

    it('ignores links on the same site', () => {
        expect(outboundUrl('https://bluprince13.com/blog', 'bluprince13.com')).toBeNull()
    })

    it('ignores mailto and malformed links', () => {
        expect(outboundUrl('mailto:someone@example.com', 'bluprince13.com')).toBeNull()
        expect(outboundUrl('not a url', 'bluprince13.com')).toBeNull()
    })
})
