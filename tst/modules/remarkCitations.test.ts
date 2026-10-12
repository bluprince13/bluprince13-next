import { describe, it, expect } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkCitations from '@Modules/remarkCitations'

async function render(markdown: string): Promise<string> {
    return renderToStaticMarkup(createElement(Markdown, { remarkPlugins: [remarkCitations] }, markdown))
}

describe('remarkCitations', () => {
    it('renders a parenthesised publisher · title link as a citation', async () => {
        expect(await render('Screened for 9 conditions ([NHS · Blood spot test](https://nhs.uk/x)).')).toBe(
            '<p>Screened for 9 conditions <span class="citation">(<a href="https://nhs.uk/x"><span class="citation-publisher">NHS</span> · Blood spot test</a>)</span>.</p>'
        )
    })

    it('keeps text after the closing parenthesis', async () => {
        expect(await render('A ([gov.uk · Child Benefit](https://gov.uk/cb)), then B.')).toContain(
            '</a>)</span>, then B.'
        )
    })

    it('handles several citations in one paragraph', async () => {
        const html = await render('A ([NHS · One](https://a)). B ([NHS · Two](https://b)).')
        expect(html.match(/class="citation"/g)).toHaveLength(2)
    })

    it('styles a parenthesised link without a separator, with no publisher', async () => {
        expect(await render('See ([the guide](https://a)).')).toBe(
            '<p>See <span class="citation">(<a href="https://a">the guide</a>)</span>.</p>'
        )
    })

    it('leaves a link in parenthetical prose alone', async () => {
        expect(await render('Get the jabs (see [MMR](https://a) and more).')).toBe(
            '<p>Get the jabs (see <a href="https://a">MMR</a> and more).</p>'
        )
    })

    it('leaves a link with a separator but no parentheses alone', async () => {
        expect(await render('See [NHS · One](https://a).')).toBe('<p>See <a href="https://a">NHS · One</a>.</p>')
    })
})
