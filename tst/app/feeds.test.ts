import { GET as getRssRoute } from '@App/feed.xml/route'
import { GET as getAtomRoute } from '@App/atom.xml/route'
import { GET as getJsonRoute } from '@App/feed.json/route'

beforeAll(() => { process.env.SITE_ROOT = 'https://example.com' })
afterAll(() => { delete process.env.SITE_ROOT })

describe('/feed.xml route', () => {
    it('returns 200 with application/xml content-type', async () => {
        const res = getRssRoute()
        expect(res.status).toBe(200)
        expect(res.headers.get('Content-Type')).toBe('application/xml')
    })

    it('body contains RSS xml', async () => {
        const res = getRssRoute()
        const text = await res.text()
        expect(text).toContain('<rss')
    })
})

describe('/atom.xml route', () => {
    it('returns 200 with application/xml content-type', async () => {
        const res = getAtomRoute()
        expect(res.status).toBe(200)
        expect(res.headers.get('Content-Type')).toBe('application/xml')
    })

    it('body contains Atom xml', async () => {
        const res = getAtomRoute()
        const text = await res.text()
        expect(text).toContain('<feed')
    })
})

describe('/feed.json route', () => {
    it('returns 200 with application/json content-type', async () => {
        const res = getJsonRoute()
        expect(res.status).toBe(200)
        expect(res.headers.get('Content-Type')).toBe('application/json')
    })

    it('body is valid JSON', async () => {
        const res = getJsonRoute()
        const text = await res.text()
        expect(() => JSON.parse(text)).not.toThrow()
    })
})
