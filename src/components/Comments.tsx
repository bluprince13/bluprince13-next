'use client'

import { useEffect } from 'react'
import { Comments, CommentCount } from '@hyvor/hyvor-talk-react'
import { CommentCounts } from '@hyvor/hyvor-talk-base'
import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useSyncExternalStore } from 'react'

const HYVOR_WEBSITE_ID = 2205

export const MyCommentCount = ({ id }: { id: string }) => {
    useEffect(() => {
        CommentCounts.load({ 'website-id': HYVOR_WEBSITE_ID })
    }, [])

    return <CommentCount website-id={HYVOR_WEBSITE_ID} page-id={id} />
}

export function MyComments({ id }: { id: string }) {
    const { mode } = useColorScheme()
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

    if (!mounted) return null

    const colorMode = mode === 'dark' ? 'dark' : 'light'
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
