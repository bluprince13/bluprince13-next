'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useSyncExternalStore } from 'react'
import { useColorMode } from '@Modules/useColorMode'

const HYVOR_WEBSITE_ID = 2205

const Comments = dynamic(
    () => import('@hyvor/hyvor-talk-react').then((m) => m.Comments),
    { ssr: false }
)

const CommentCount = dynamic(
    () => import('@hyvor/hyvor-talk-react').then((m) => m.CommentCount),
    { ssr: false }
)

export const MyCommentCount = ({ id }: { id: string }) => {
    useEffect(() => {
        import('@hyvor/hyvor-talk-base').then(({ CommentCounts }) => {
            CommentCounts.load({ 'website-id': HYVOR_WEBSITE_ID })
        })
    }, [])

    return <CommentCount website-id={HYVOR_WEBSITE_ID} page-id={id} />
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
