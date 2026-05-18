'use client'

import { Comments, CommentCount } from '@hyvor/hyvor-talk-react'
import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'

const HYVOR_WEBSITE_ID = 2205

export const MyCommentCount = ({ id }) => (
    <CommentCount website-id={HYVOR_WEBSITE_ID} page-id={id} />
)

export function MyComments({ id }) {
    const { mode } = useColorScheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

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
