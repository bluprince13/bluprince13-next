import React from 'react'

import Typography from '@mui/material/Typography'
import Emoji from 'a11y-react-emoji'
import Box from '@mui/material/Box'

import { lightBlue as blue } from '@mui/material/colors'

// TODO: Add loading indicator to button
function Subscribe() {
    return (
        <Box sx={{padding: 2, borderRadius: 5, marginY: 2}} bgcolor={blue[50]}>
                <div>
                    <Typography variant="overline">
                        Get emails from me about new articles{' '}
                    </Typography>
                    <Emoji symbol="📮" label="subscribe" />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    Subscribe to email via {' '}
                    <a href="https://buttondown.email/bluprince13">buttondown.email/bluprince13</a>.
                </div>
                <div style={{ marginTop: '1rem' }}>
                    Prefer RSS? Subscribe to my{' '}
                    <a href="https://bluprince13.com/feed.xml">RSS feed</a>.
                </div>
        </Box>
    )
}

export default Subscribe
