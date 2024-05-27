'use client'

import { Comments, CommentCount } from '@hyvor/hyvor-talk-react'
import { Box } from '@mui/material'

const HYVOR_WEBSITE_ID = 2205

export const MyCommentCount = ({ id }) => (
    <CommentCount website-id={HYVOR_WEBSITE_ID} page-id={id} />
)

export const MyComments = ({ id }) => (
    <Box sx={{ mt: 2 }}>
        <Comments website-id={HYVOR_WEBSITE_ID} page-id={id} />
    </Box>
)
