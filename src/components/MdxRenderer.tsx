'use client'

import { runSync } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import * as runtime from 'react/jsx-runtime'
import { Fragment, useMemo } from 'react'
import { mdxComponents } from '@Modules/mdxComponents'

interface MdxRendererProps {
  compiledSource: string
}

export function MdxRenderer({ compiledSource }: MdxRendererProps) {
  const Content = useMemo(() => {
    try {
      const result = runSync(compiledSource, {
        ...runtime,
        Fragment,
      })
      if (!result) return null
      const { default: C } = result
      return C ?? null
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error('[MdxRenderer] runSync failed:', e)
      return null
    }
  }, [compiledSource])

  if (!Content) return null

  return <Content components={mdxComponents as MDXComponents} />
}
