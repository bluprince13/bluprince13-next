import { useState } from 'react'
import Link from 'next/link'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}))

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
    const classes = useStyles()

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
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="simple-menu"
                className={classes.menu}
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
    )
}
