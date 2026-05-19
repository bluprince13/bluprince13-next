'use client'

import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
))(() => ({
    '& .MuiPaper-root': {
        border: '1px solid #d3d4d5'
    }
}))

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="large"
            >
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} href="/" onClick={handleClose}>Home</MenuItem>
                <MenuItem component={Link} href="/blog" onClick={handleClose}>Blog</MenuItem>
                <MenuItem component={Link} href="/apps" onClick={handleClose}>Apps</MenuItem>
                <MenuItem component={Link} href="/cv" onClick={handleClose}>CV</MenuItem>
            </StyledMenu>
        </div>
    )
}
