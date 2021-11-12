import { useState } from 'react'
import Link from 'next/link'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import withStyles from '@mui/styles/withStyles';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5'
    }
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
))

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
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
                size="large">
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div>
                    <Link href="/">
                        <MenuItem onClick={handleClose}>Home</MenuItem>
                    </Link>
                </div>
                <div>
                    <Link href="/blog">
                        <MenuItem onClick={handleClose}>Blog</MenuItem>
                    </Link>
                </div>
                <div>
                    <Link href="/apps">
                        <MenuItem onClick={handleClose}>Apps</MenuItem>
                    </Link>
                </div>
                <div>
                    <Link href="/cv">
                        <MenuItem onClick={handleClose}>CV</MenuItem>
                    </Link>
                </div>
            </StyledMenu>
        </div>
    );
}
