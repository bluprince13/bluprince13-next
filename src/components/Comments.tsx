'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useSyncExternalStore } from 'react'
import { useColorMode } from '@Modules/useColorMode'
import { HYVOR_WEBSITE_ID } from '@Modules/hyvor'

const Comments = dynamic(
    () => import('@hyvor/hyvor-talk-react').then((m) => m.Comments),
    { ssr: false }
)

/**
 * Live comment count for a single page.
 *
 * The custom element is rendered directly rather than through the dynamically
 * imported React wrapper. `CommentCounts.load()` fills in whichever
 * `hyvor-talk-comment-count` elements are in the DOM when it runs and never
 * retries, so loading the element lazily raced the loader: whenever the loader
 * chunk arrived first it found nothing and the count stayed blank. Rendering
 * the element inline puts it in the DOM in the same commit as this effect.
 */
export const MyCommentCount = ({ id }: { id: string }) => {
    useEffect(() => {
        let cancelled = false
        import('@hyvor/hyvor-talk-base').then(({ CommentCounts }) => {
            if (!cancelled) CommentCounts.load({ 'website-id': HYVOR_WEBSITE_ID })
        })
        return () => {
            cancelled = true
        }
    }, [])

    return <hyvor-talk-comment-count website-id={HYVOR_WEBSITE_ID} page-id={id} />
}

export function MyComments({ id }: { id: string }) {
    const { isDark } = useColorMode()
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

    if (!mounted) return null

    const colorMode = isDark ? 'dark' : 'light'
    return (
        <Box sx={{ mt: 2 }}>
            <Comments
                key={colorMode}
                website-id={HYVOR_WEBSITE_ID}
                page-id={id}
                colors={colorMode}
            />
        </Box>
    )
}
