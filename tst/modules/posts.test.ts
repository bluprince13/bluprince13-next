import { getPostDataAndContent } from '@Modules/posts'

describe('getPostDataAndContent', () => {
    it('strips frontmatter from content', () => {
        const { content } = getPostDataAndContent(
            'applying-for-uk-citizenship'
        )
        expect(content).not.toContain('---')
        expect(content).not.toContain("date: '2022-03-28'")
    })
})
