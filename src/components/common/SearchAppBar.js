import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Box } from '@material-ui/core'

import SimpleMenu from './SimpleMenu'

const useStyles = makeStyles((theme) => ({
    root: {},
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    titleButton: {
        textTransform: 'none',
        fontSize: '1.2rem',
        color: '#fff'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
}))

export default function SearchAppBar() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Head>
                <title>bluprince13</title>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="bluprince13 RSS feed"
                    href="https://www.bluprince13.com/feed.xml"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="bluprince13 Atom feed"
                    href="https://www.bluprince13.com/atom.xml"
                />
                <link
                    rel="alternate"
                    type="application/json"
                    title="bluprince13 JSON feed"
                    href="https://www.bluprince13.com/feed.json"
                />
            </Head>
            <AppBar position="static">
                <Toolbar>
                    <SimpleMenu />
                    <Box className={classes.title}>
                        <Link href="/" passHref>
                            <Button
                                className={classes.titleButton}
                                disableRipple
                            >
                                bluprince13
                            </Button>
                        </Link>
                    </Box>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
