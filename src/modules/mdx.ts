import { compile, evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkToc from 'remark-toc'
import remarkEmoji from 'remark-emoji'
import remarkCodesandbox from 'remark-codesandbox'
import mdxMermaid from 'mdx-mermaid'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeCitation from 'rehype-citation'
import type React from 'react'

export async function compileMdx(content: string): Promise<string> {
  const compiled = await compile(content, {
    outputFormat: 'function-body',
  })

  return String(compiled)
}

export async function evaluateBlogMdx(content: string): Promise<React.ComponentType<any>> {
  const { default: Content } = await evaluate(content, {
    ...(runtime as any),
    remarkPlugins: [
      remarkToc,
      remarkEmoji,
      [remarkCodesandbox, { mode: 'button' }],
      [mdxMermaid, {}],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: { ariaHidden: 'false', tabIndex: 0 },
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['anchor', 'fas', 'fa-link'],
          },
        },
      }],
      rehypePrettyCode,
      [rehypeCitation, { linkCitations: true, csl: 'vancouver' }],
    ],
  })

  return Content as React.ComponentType<any>
}
