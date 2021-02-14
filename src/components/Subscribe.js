import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Emoji from 'a11y-react-emoji'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import blue from '@material-ui/core/colors/lightBlue'

import fetcher from '@Modules/fetcher'

const useStyles = makeStyles(() => ({
    root: {
        padding: '0.5rem',
        borderRadius: 10
    },
    subscribeButton: {
        marginLeft: '1rem'
    }
}))

// TODO: Add loading indicator to button
function Subscribe() {
    const classes = useStyles()

    const { data } = useSWR('/api/buttondown/subscribers', fetcher)
    const subscriberCount = format(data?.count)

    const inputEl = useRef(null)
    const [message, setMessage] = useState('')

    const subscribe = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/buttondown/subscribe', {
            body: JSON.stringify({
                email: inputEl.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        const { error } = await res.json()

        if (error) {
            setMessage(error)
            return
        }

        inputEl.current.value = ''
        setMessage('Success! 🎉 You are now subscribed.')
    }

    return (
        <Box className={classes.root} bgcolor={blue[50]}>
            <form onSubmit={subscribe} className={classes.root}>
                <div>
                    <Typography variant="overline">
                        Get emails from me about new articles{' '}
                    </Typography>
                    <Emoji symbol="📮" label="subscribe" />
                </div>
                <Box>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <TextField
                                placeholder="hero@awesome.com"
                                type="email"
                                inputRef={inputEl}
                                fullWidth
                                required
                                InputLabelProps={{ required: false }}
                            />
                        </Box>
                        <Button
                            className={classes.subscribeButton}
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Subscribe
                        </Button>
                    </Box>
                </Box>
                <div>
                    {message || `${subscriberCount || '---'} subscribers`}
                </div>
                <div style={{ marginTop: '1rem' }}>
                    Prefer RSS? Subscribe to my{' '}
                    <a href="https://bluprince13.com/feed.xml">RSS feed</a>
                </div>
            </form>
        </Box>
    )
}

export default Subscribe
