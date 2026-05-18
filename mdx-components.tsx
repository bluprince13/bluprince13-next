import type { MDXComponents } from 'mdx/types'
import { mdxComponents } from '@Modules/mdxComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return { ...mdxComponents, ...components } as MDXComponents
}
