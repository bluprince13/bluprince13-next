'use client'

import Link from 'next/link'
import { useState, useEffect, startTransition, useSyncExternalStore } from 'react'

import { useColorScheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import SimpleMenu from './SimpleMenu'
import SearchModal from './SearchModal'

export default function AppBar() {
    const [searchOpen, setSearchOpen] = useState(false)
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
    const { mode, setMode } = useColorScheme()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setSearchOpen(open => !open)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const toggleColorMode = () => {
        startTransition(() => {
            setMode(mode === 'light' ? 'dark' : 'light')
        })
    }

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar>
                    <SimpleMenu />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <Link href="/" passHref>
                            <Button sx={{ textTransform: 'none', fontSize: '1.2rem', color: '#fff' }} disableRipple>
                                bluprince13
                            </Button>
                        </Link>
                    </Box>
                    <IconButton
                        onClick={() => setSearchOpen(true)}
                        color="inherit"
                        aria-label="open search (⌘K)"
                    >
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
                        {mounted && (mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />)}
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    )
}
