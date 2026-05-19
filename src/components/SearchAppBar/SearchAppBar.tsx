'use client'

import Link from 'next/link'
import { useState, startTransition, useSyncExternalStore } from 'react'

import { alpha, useColorScheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import SimpleMenu from './SimpleMenu'

export default function SearchAppBar() {
    const [searchTerm, setSearchTerm] = useState('')
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
    const { mode, setMode } = useColorScheme()

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e)
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <SimpleMenu />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    <Link href="/" passHref>
                        <Button sx={{ textTransform: 'none', fontSize: '1.2rem', color: '#fff' }} disableRipple>
                            bluprince13
                        </Button>
                    </Link>
                </Box>
                <form onSubmit={handleSearchSubmit}>
                    <Box
                        sx={(theme) => ({
                            position: 'relative',
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: alpha(theme.palette.common.white, 0.15),
                            '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
                            ml: 0,
                            width: '100%',
                            [theme.breakpoints.up('sm')]: { ml: 1, width: 'auto' },
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                p: theme.spacing(0, 2),
                                height: '100%',
                                position: 'absolute',
                                pointerEvents: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            })}
                        >
                            <SearchIcon />
                        </Box>
                        <InputBase
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            inputProps={{ 'aria-label': 'search' }}
                            sx={(theme) => ({
                                color: 'inherit',
                                '& .MuiInputBase-input': {
                                    p: theme.spacing(1, 1, 1, 0),
                                    pl: `calc(1em + ${theme.spacing(4)})`,
                                    transition: theme.transitions.create('width'),
                                    width: '100%',
                                    [theme.breakpoints.up('sm')]: {
                                        width: '12ch',
                                        '&:focus': { width: '20ch' },
                                    },
                                },
                            })}
                        />
                    </Box>
                </form>
                <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
                    {mounted && (mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />)}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
