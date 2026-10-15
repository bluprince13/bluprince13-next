import { describe, it, expect } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Root, Heading, Text, Link } from 'mdast'
import remarkToc from 'remark-toc'
import { visit } from 'unist-util-visit'
import remarkNumberHeadings, { APPENDIX_SUBSECTION_TOC_SKIP } from '@Modules/remarkNumberHeadings'

async function getHeadings(markdown: string): Promise<{ depth: number; text: string }[]> {
  const processor = unified().use(remarkParse).use(remarkNumberHeadings)
  const tree = processor.parse(markdown)
  await processor.run(tree)
  const headings: { depth: number; text: string }[] = []
  ;(tree as Root).children.forEach((node) => {
    if (node.type === 'heading') {
      const h = node as Heading
      const text = h.children
        .filter((c) => c.type === 'text')
        .map((c) => (c as Text).value)
        .join('')
      headings.push({ depth: h.depth, text })
    }
  })
  return headings
}

describe('remarkNumberHeadings', () => {
  it('numbers sequential h2 headings', async () => {
    const headings = await getHeadings('## Alpha\n\n## Beta\n\n## Gamma\n')
    expect(headings[0].text).toBe('1. Alpha')
    expect(headings[1].text).toBe('2. Beta')
    expect(headings[2].text).toBe('3. Gamma')
  })

  it('numbers h3 sub-headings under h2', async () => {
    const headings = await getHeadings(
      '## Alpha\n\n### Sub A\n\n### Sub B\n\n## Beta\n\n### Sub C\n'
    )
    expect(headings[0].text).toBe('1. Alpha')
    expect(headings[1].text).toBe('1.1. Sub A')
    expect(headings[2].text).toBe('1.2. Sub B')
    expect(headings[3].text).toBe('2. Beta')
    expect(headings[4].text).toBe('2.1. Sub C')
  })

  it('numbers h4 sub-sub-headings', async () => {
    const headings = await getHeadings('## Alpha\n\n### Sub\n\n#### Deep\n')
    expect(headings[0].text).toBe('1. Alpha')
    expect(headings[1].text).toBe('1.1. Sub')
    expect(headings[2].text).toBe('1.1.1. Deep')
  })

  it('resets deeper counters when going back to a shallower depth', async () => {
    const headings = await getHeadings(
      '## A\n\n### A1\n\n### A2\n\n## B\n\n### B1\n'
    )
    expect(headings[1].text).toBe('1.1. A1')
    expect(headings[2].text).toBe('1.2. A2')
    expect(headings[4].text).toBe('2.1. B1')
  })

  it('skips the Table of contents heading', async () => {
    const headings = await getHeadings('## Table of contents\n\n## Introduction\n')
    expect(headings[0].text).toBe('Table of contents')
    expect(headings[1].text).toBe('1. Introduction')
  })

  it('skips TOC heading case-insensitively', async () => {
    const headings = await getHeadings('## TABLE OF CONTENTS\n\n## Introduction\n')
    expect(headings[0].text).toBe('TABLE OF CONTENTS')
    expect(headings[1].text).toBe('1. Introduction')
  })

  it('does not number h1 headings', async () => {
    const headings = await getHeadings('# Title\n\n## Section\n')
    expect(headings[0].text).toBe('Title')
    expect(headings[1].text).toBe('1. Section')
  })

  it('leaves the Appendix heading unnumbered and letters the appendices under it', async () => {
    const headings = await getHeadings(
      '## Intro\n\n## Appendix\n\n### Shopping\n\n#### Car seat\n\n#### Pram\n\n### Apps\n\n#### Tracker\n'
    )
    expect(headings.map((h) => h.text)).toEqual([
      '1. Intro',
      'Appendix',
      'Appendix A - Shopping',
      'A.1. Car seat',
      'A.2. Pram',
      'Appendix B - Apps',
      'B.1. Tracker',
    ])
  })

  it('resumes numbering after the appendix if another section follows', async () => {
    const headings = await getHeadings('## Intro\n\n## Appendix\n\n### Extra\n\n## Outro\n\n### Sub\n')
    expect(headings[3].text).toBe('2. Outro')
    expect(headings[4].text).toBe('2.1. Sub')
  })

  it('keeps appendix subsections out of the table of contents', async () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkNumberHeadings)
      .use(remarkToc, { skip: APPENDIX_SUBSECTION_TOC_SKIP })
    const markdown =
      '## Table of contents\n\n## Intro\n\n### Detail\n\n## Appendix\n\n### Shopping\n\n#### Car seat\n'
    const tree = (await processor.run(processor.parse(markdown))) as Root
    const urls: string[] = []
    visit(tree, 'link', (link: Link) => {
      urls.push(link.url)
    })
    expect(urls).toEqual(['#intro', '#detail', '#appendix', '#shopping'])
  })

  it('generates heading ids from the unnumbered text', async () => {
    const processor = unified().use(remarkParse).use(remarkNumberHeadings)
    const tree = (await processor.run(processor.parse('## Alpha\n\n### Sub `code` £1\n\n## Alpha\n'))) as Root
    const ids = tree.children.map((h) => (h as Heading).data?.hProperties?.id)
    expect(ids).toEqual(['alpha', 'sub-code-1', 'alpha-1'])
  })
})
