'use client'

import { useEffect } from 'react'
import { Comments, CommentCount } from '@hyvor/hyvor-talk-react'
import { CommentCounts } from '@hyvor/hyvor-talk-base'
import { Box } from '@mui/material'
import { useSyncExternalStore } from 'react'
import { useColorMode } from '@Modules/useColorMode'

const HYVOR_WEBSITE_ID = 2205

export const MyCommentCount = ({ id }: { id: string }) => {
    useEffect(() => {
        CommentCounts.load({ 'website-id': HYVOR_WEBSITE_ID })
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
