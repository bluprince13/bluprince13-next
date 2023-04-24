import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'
import Emoji from 'a11y-react-emoji'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import fetcher from '@Modules/fetcher'

import { lightBlue as blue } from '@mui/material/colors'

const useStyles = makeStyles(() => ({
    root: {
        padding: '0.5rem',
        borderRadius: 10,
        margin: "1rem 0"
    }
}))

// TODO: Add loading indicator to button
function Subscribe() {
    const classes = useStyles()

    return (
        <Box className={classes.root} bgcolor={blue[50]}>
            <div className={classes.root}>
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
            </div>
        </Box>
    )
}

export default Subscribe
