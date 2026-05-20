import { getPostDataAndContent } from '@Modules/posts'

describe('getPostDataAndContent', () => {
    it('strips frontmatter from content', () => {
        const { content } = getPostDataAndContent(
            'applying-for-uk-citizenship'
        )
        expect(content).not.toContain('---')
        expect(content).not.toContain("date: '2022-03-28'")
    })

    describe('readingTime', () => {
        it('is a positive integer', () => {
            const { data } = getPostDataAndContent('applying-for-uk-citizenship')
            expect(data.readingTime).toBeGreaterThan(0)
            expect(Number.isInteger(data.readingTime)).toBe(true)
        })
    })

    describe('excerpt', () => {
        it('is at most 301 characters (300 + ellipsis)', () => {
            const slugs = [
                'applying-for-uk-citizenship',
                'baby-finance-101',
                'applying-for-oci-for-british-minor',
            ]
            for (const slug of slugs) {
                const { data } = getPostDataAndContent(slug)
                expect(data.excerpt.length).toBeLessThanOrEqual(301)
            }
        })

        it('contains no markdown link syntax', () => {
            const { data } = getPostDataAndContent('applying-for-uk-citizenship')
            expect(data.excerpt).not.toMatch(/\[.*\]\(.*\)/)
        })

        it('ends with ellipsis when intro exceeds 300 characters', () => {
            const { data } = getPostDataAndContent('baby-finance-101')
            expect(data.excerpt.endsWith('…')).toBe(true)
        })

        it('does not end with ellipsis when intro is short', () => {
            const { data } = getPostDataAndContent('my-2021-goals-review')
            expect(data.excerpt.endsWith('…')).toBe(false)
        })
    })
})
