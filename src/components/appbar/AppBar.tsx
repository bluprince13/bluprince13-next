'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import MuiAppBar from '@mui/material/AppBar'
import { useColorMode } from '@Modules/useColorMode'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import SimpleMenu from './SimpleMenu'
import SearchModal from './SearchModal'

const NAV_LINKS = [
    { label: 'Blog', href: '/blog' },
    { label: 'Apps', href: '/apps' },
    { label: 'CV', href: '/cv' },
]

export default function AppBar() {
    const [searchOpen, setSearchOpen] = useState(false)
    const { toggleColorMode } = useColorMode()
    const pathname = usePathname()

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

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar>
                    {/* Hamburger — mobile only */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <SimpleMenu />
                    </Box>

                    {/* Logo — always visible */}
                    <Link href="/" passHref>
                        <Button sx={{ textTransform: 'none', fontSize: '1.2rem', color: '#fff' }} disableRipple>
                            bluprince13
                        </Button>
                    </Link>

                    {/* Inline nav links — desktop only */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 2 }}>
                        {NAV_LINKS.map(({ label, href }) => {
                            const active = pathname === href || pathname.startsWith(href + '/')
                            return (
                                <Link key={href} href={href} passHref>
                                    <Button
                                        sx={{
                                            color: '#fff',
                                            textTransform: 'none',
                                            borderBottom: active ? '2px solid #fff' : '2px solid transparent',
                                            borderRadius: 0,
                                            pb: '2px',
                                        }}
                                        disableRipple
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            )
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton
                        onClick={() => setSearchOpen(true)}
                        color="inherit"
                        aria-label="open search (⌘K)"
                    >
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle dark mode">
                        <Brightness4Icon sx={{ '[data-theme="dark"] &': { display: 'none' } }} />
                        <Brightness7Icon sx={{ '[data-theme="light"] &': { display: 'none' } }} />
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    )
}
