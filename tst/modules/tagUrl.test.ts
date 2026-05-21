import { buildTagUrl } from '@Modules/tagUrl'

describe('buildTagUrl', () => {
    it('returns /blog with no tags', () => {
        expect(buildTagUrl([])).toBe('/blog')
    })

    it('returns /blog?tag=x with a single tag', () => {
        expect(buildTagUrl(['react'])).toBe('/blog?tag=react')
    })

    it('returns multiple tag params for multiple tags', () => {
        expect(buildTagUrl(['react', 'typescript'])).toBe('/blog?tag=react&tag=typescript')
    })
})
