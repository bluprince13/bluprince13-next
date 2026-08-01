import { buildBlogUrl } from '@Modules/blogUrl'

describe('buildBlogUrl', () => {
    it('returns /blog with no tags', () => {
        expect(buildBlogUrl([])).toBe('/blog')
    })

    it('returns /blog?tag=x with a single tag', () => {
        expect(buildBlogUrl(['react'])).toBe('/blog?tag=react')
    })

    it('returns multiple tag params for multiple tags', () => {
        expect(buildBlogUrl(['react', 'typescript'])).toBe('/blog?tag=react&tag=typescript')
    })

    it('omits sort params for the default sort', () => {
        expect(buildBlogUrl([], { field: 'date', direction: 'desc' })).toBe('/blog')
    })

    it('adds the sort field when it is not the default', () => {
        expect(buildBlogUrl([], { field: 'views', direction: 'desc' })).toBe('/blog?sort=views')
    })

    it('adds the direction when it is not the default', () => {
        expect(buildBlogUrl([], { field: 'date', direction: 'asc' })).toBe('/blog?dir=asc')
    })

    it('adds both sort params when neither is the default', () => {
        expect(buildBlogUrl([], { field: 'comments', direction: 'asc' })).toBe(
            '/blog?sort=comments&dir=asc'
        )
    })

    it('keeps tags and sort together', () => {
        expect(buildBlogUrl(['react'], { field: 'views', direction: 'asc' })).toBe(
            '/blog?tag=react&sort=views&dir=asc'
        )
    })
})
