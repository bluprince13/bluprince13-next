import { GET as getRssRoute } from '@App/feed.xml/route'
import { GET as getAtomRoute } from '@App/atom.xml/route'
import { GET as getJsonRoute } from '@App/feed.json/route'
import { getSortedPosts } from '@Modules/posts'

beforeAll(() => { process.env.SITE_ROOT = 'https://example.com' })
afterAll(() => { delete process.env.SITE_ROOT })

describe.each([
    { path: '/feed.xml', GET: getRssRoute, contentType: 'application/rss+xml', marker: '<rss' },
    { path: '/atom.xml', GET: getAtomRoute, contentType: 'application/atom+xml', marker: '<feed' },
    { path: '/feed.json', GET: getJsonRoute, contentType: 'application/feed+json', marker: '"items"' },
])('$path route', ({ GET, contentType, marker }) => {
    it('returns 200 with the feed content-type', () => {
        const res = GET()
        expect(res.status).toBe(200)
        expect(res.headers.get('Content-Type')).toContain(contentType)
    })

    it('body is a feed containing blog posts', async () => {
        const text = await GET().text()
        expect(text).toContain(marker)
        expect(text).toContain(`/blog/${getSortedPosts()[0].slug}`)
    })
})
