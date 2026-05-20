import { visit } from 'unist-util-visit'
import type { Root, Heading, Text } from 'mdast'
import type { Plugin } from 'unified'

const remarkNumberHeadings: Plugin<[], Root> = () => (tree) => {
  const counters: number[] = [0, 0, 0, 0, 0, 0, 0] // index = depth (1-6)

  visit(tree, 'heading', (node: Heading) => {
    const depth = node.depth
    if (depth < 2) return

    const text = node.children
      .filter((c) => c.type === 'text')
      .map((c) => (c as Text).value)
      .join('')
    if (/^\s*table of contents\s*$/i.test(text)) return

    counters[depth]++
    for (let d = depth + 1; d <= 6; d++) counters[d] = 0

    const prefix = counters.slice(2, depth + 1).join('.') + '.'

    const firstText = node.children.find((c) => c.type === 'text') as Text | undefined
    if (firstText) firstText.value = `${prefix} ${firstText.value}`
  })
}

export default remarkNumberHeadings
