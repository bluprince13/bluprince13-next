'use client'

import Link from 'next/link'
import { useState, startTransition, useEffect } from 'react'

import { styled, useColorScheme } from '@mui/material/styles'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import { alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Box } from '@mui/material'

import SimpleMenu from './SimpleMenu'

const PREFIX = 'SearchAppBar'

const classes = {
    root: `${PREFIX}-root`,
    menuButton: `${PREFIX}-menuButton`,
    title: `${PREFIX}-title`,
    titleButton: `${PREFIX}-titleButton`,
    search: `${PREFIX}-search`,
    searchIcon: `${PREFIX}-searchIcon`,
    inputRoot: `${PREFIX}-inputRoot`,
    inputInput: `${PREFIX}-inputInput`
}

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {},

    [`& .${classes.menuButton}`]: {
        marginRight: theme.spacing(2)
    },

    [`& .${classes.title}`]: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },

    [`& .${classes.titleButton}`]: {
        textTransform: 'none',
        fontSize: '1.2rem',
        color: '#fff'
    },

    [`& .${classes.search}`]: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },

    [`& .${classes.searchIcon}`]: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    [`& .${classes.inputRoot}`]: {
        color: 'inherit'
    },

    [`& .${classes.inputInput}`]: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
    const [searchTerm, setSearchTerm] = useState('')
    const [mounted, setMounted] = useState(false)
    const { mode, setMode } = useColorScheme()

    useEffect(() => setMounted(true), [])

    const toggleColorMode = () => {
        startTransition(() => {
            setMode(mode === 'light' ? 'dark' : 'light')
        })
    }

    const handleSearchSubmit = (e: React.FormEvent | React.MouseEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            const googleSearchUrl = `https://www.google.com/search?q=site:bluprince13.com ${encodeURIComponent(searchTerm)}`
            window.open(googleSearchUrl, '_blank')
            setSearchTerm('')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e)
        }
    }

    return (
        <Root className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <SimpleMenu />
                    <Box className={classes.title}>
                        <Link href="/" passHref>
                            <Button className={classes.titleButton} disableRipple>
                                bluprince13
                            </Button>
                        </Link>
                    </Box>
                    <form onSubmit={handleSearchSubmit}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon} onClick={handleSearchSubmit}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </form>
                    <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
                        {mounted && (mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />)}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Root>
    )
}
