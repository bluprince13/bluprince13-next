import { visit, SKIP } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import type { Root, Link, Text, PhrasingContent } from 'mdast'
import type { Plugin } from 'unified'

const SEPARATOR = ' · '

const span = (className: string, children: PhrasingContent[]): PhrasingContent =>
    ({
        type: 'emphasis',
        children,
        data: { hName: 'span', hProperties: { className: [className] } },
    }) as PhrasingContent

// Turns `([Publisher · Title](url))` or `([Title](url))` into a quietly styled citation.
const remarkCitations: Plugin<[], Root> = () => (tree) => {
    visit(tree, 'link', (node: Link, index, parent) => {
        if (!parent || index === undefined || index === 0) return
        const before = parent.children[index - 1]
        const after = parent.children[index + 1]
        if (before?.type !== 'text' || !before.value.endsWith('(')) return
        if (after?.type !== 'text' || !after.value.startsWith(')')) return

        before.value = before.value.slice(0, -1)
        after.value = after.value.slice(1)

        const label = toString(node)
        const split = label.indexOf(SEPARATOR)
        const link: Link =
            split > 0
                ? {
                      ...node,
                      children: [
                          span('citation-publisher', [{ type: 'text', value: label.slice(0, split) } as Text]),
                          { type: 'text', value: label.slice(split) },
                      ],
                  }
                : node
        parent.children[index] = span('citation', [
            { type: 'text', value: '(' },
            link,
            { type: 'text', value: ')' },
        ])
        return [SKIP, index + 1]
    })
}

export default remarkCitations
