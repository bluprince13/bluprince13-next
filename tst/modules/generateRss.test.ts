import { getRssFeed, getAtomFeed, getJsonFeed } from '@Modules/generateRss'

beforeAll(() => { process.env.SITE_ROOT = 'https://example.com' })
afterAll(() => { delete process.env.SITE_ROOT })

const articles = [
    {
        title: 'Test Article',
        href: 'https://bluprince13.com/blog/test',
        description: 'A test article',
        dateFormatted: '1 January 2024',
        banner: '/img/test.jpg',
    },
]

describe('getRssFeed', () => {
    it('returns a string containing RSS xml', () => {
        const result = getRssFeed({ articles })
        expect(typeof result).toBe('string')
        expect(result).toContain('<rss')
        expect(result).toContain('Test Article')
    })
})

describe('getAtomFeed', () => {
    it('returns a string containing Atom xml', () => {
        const result = getAtomFeed({ articles })
        expect(typeof result).toBe('string')
        expect(result).toContain('<feed')
        expect(result).toContain('Test Article')
    })
})

describe('getJsonFeed', () => {
    it('returns a valid JSON string', () => {
        const result = getJsonFeed({ articles })
        expect(typeof result).toBe('string')
        const parsed = JSON.parse(result)
        expect(parsed.items[0].title).toBe('Test Article')
    })
})
