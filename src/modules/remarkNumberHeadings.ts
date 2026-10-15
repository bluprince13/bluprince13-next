import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import type { Root, Heading, Text } from 'mdast'
import type { Plugin } from 'unified'

const UNNUMBERED_HEADING = /^\s*table of contents\s*$/i
const APPENDIX_HEADING = /^\s*appendix\s*$/i

// remark-toc `skip` value matching subsections numbered inside an appendix, e.g. "A.1. Car seat".
export const APPENDIX_SUBSECTION_TOC_SKIP = '[a-z]\\.\\d.*'

const remarkNumberHeadings: Plugin<[], Root> = () => (tree) => {
  const counters: number[] = [0, 0, 0, 0, 0, 0, 0] // index = depth (1-6)
  const slugger = new GithubSlugger()
  let inAppendix = false

  visit(tree, 'heading', (node: Heading) => {
    // Slug before numbering so links to a section survive reordering; rehype-slug keeps existing ids.
    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: slugger.slug(toString(node)) } }

    const depth = node.depth
    if (depth < 2) return

    const text = node.children
      .filter((c) => c.type === 'text')
      .map((c) => (c as Text).value)
      .join('')
    if (UNNUMBERED_HEADING.test(text)) return

    if (depth === 2) {
      inAppendix = APPENDIX_HEADING.test(text)
      if (inAppendix) {
        for (let d = 3; d <= 6; d++) counters[d] = 0
        return
      }
    }

    counters[depth]++
    for (let d = depth + 1; d <= 6; d++) counters[d] = 0

    let prefix: string
    if (!inAppendix) {
      prefix = counters.slice(2, depth + 1).join('.') + '.'
    } else {
      const letter = String.fromCharCode(64 + counters[3])
      prefix = depth === 3 ? `Appendix ${letter} -` : [letter, ...counters.slice(4, depth + 1)].join('.') + '.'
    }

    const firstText = node.children.find((c) => c.type === 'text') as Text | undefined
    if (firstText) firstText.value = `${prefix} ${firstText.value}`
  })
}

export default remarkNumberHeadings
