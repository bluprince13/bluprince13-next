import { render, within } from '@testing-library/react'
import TableOfContents from '@Components/blog/TableOfContents'

// jsdom has no IntersectionObserver, and the component bails out without one.
class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

beforeAll(() => {
    vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver)
})

afterEach(() => {
    document.body.innerHTML = ''
})

// Mirrors what remarkNumberHeadings, rehype-slug and rehype-autolink-headings
// leave in the DOM: numbered text, an id, and an appended '#' anchor.
function renderArticle(headings: { tag: 'h2' | 'h3'; id: string; text: string }[]) {
    const article = document.createElement('div')
    article.id = 'post-content'
    article.innerHTML =
        '<h2 id="table-of-contents">Table of contents<a href="#table-of-contents"><span class="anchor">#</span></a></h2>' +
        headings
            .map(
                ({ tag, id, text }) =>
                    `<${tag} id="${id}">${text}<a href="#${id}"><span class="anchor">#</span></a></${tag}>`
            )
            .join('')
    document.body.appendChild(article)
}

const sampleHeadings = [
    { tag: 'h2' as const, id: '1-first-section', text: '1. First section' },
    { tag: 'h3' as const, id: '1-1-a-subsection', text: '1.1. A subsection' },
    { tag: 'h2' as const, id: '2-second-section', text: '2. Second section' }
]

// The fixture article lives in document.body alongside the component, so every
// query is scoped to the render container rather than using `screen`.
describe('TableOfContents', () => {
    it('lists every heading with the trailing anchor stripped', () => {
        renderArticle(sampleHeadings)
        const { container } = render(<TableOfContents />)
        const toc = within(container)

        expect(toc.getByText('1. First section')).toBeInTheDocument()
        expect(toc.getByText('1.1. A subsection')).toBeInTheDocument()
        expect(toc.getByText('2. Second section')).toBeInTheDocument()
        expect(toc.queryByText(/#/)).toBeNull()
    })

    it("excludes the post's own inline table of contents heading", () => {
        renderArticle(sampleHeadings)
        const { container } = render(<TableOfContents />)

        expect(within(container).queryByText('Table of contents')).toBeNull()
    })

    it('links each entry to its heading id', () => {
        renderArticle(sampleHeadings)
        const { container } = render(<TableOfContents />)

        // The panel starts collapsed, so its links are out of the accessibility
        // tree until it expands.
        const hrefs = within(container)
            .getAllByRole('link', { hidden: true })
            .map(l => l.getAttribute('href'))
        expect(hrefs).toContain('#1-first-section')
        expect(hrefs).toContain('#1-1-a-subsection')
        expect(hrefs).toContain('#2-second-section')
    })

    it('renders nothing when the post has fewer than two headings', () => {
        renderArticle([sampleHeadings[0]])
        const { container } = render(<TableOfContents />)

        expect(container.firstChild).toBeNull()
    })

    it('renders nothing when there is no post content', () => {
        const { container } = render(<TableOfContents />)

        expect(container.firstChild).toBeNull()
    })

    it('ignores headings without an id', () => {
        renderArticle(sampleHeadings)
        const stray = document.createElement('h2')
        stray.textContent = 'More articles'
        document.getElementById('post-content')!.appendChild(stray)
        const { container } = render(<TableOfContents />)

        expect(within(container).queryByText('More articles')).toBeNull()
    })
})
