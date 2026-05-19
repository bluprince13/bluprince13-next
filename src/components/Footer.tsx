'use client'

import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Icon from '@Components/Icon'

const AUTHOR = 'Vipin Ajayakumar'

const FooterLink = ({ children, to }: { children: React.ReactNode; to: string }) => (
    <Box component="a" href={to} sx={{
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': { textDecoration: 'none' },
        '&:focus': { textDecoration: 'none' },
        '&:active': { textDecoration: 'none' },
    }}>
        <Typography variant="body2" color="inherit" sx={{ pl: '1rem' }}>
            {children}
        </Typography>
    </Box>
)

const IconBar = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <Icon url="https://linkedin.com/in/vipinajayakumar" />
        <Icon url="https://twitter.com/vipinajayakumar" />
        <Icon url="https://github.com/bluprince13" />
        <Icon url="https://www.youtube.com/channel/UCyDgfMZyUxO6Ave0KxtxcCw" />
        <Icon url="https://letterboxd.com/vipinajayakumar/" network="letterboxd" />
        <Icon url="https://www.goodreads.com/user/show/18863116-vipin-ajayakumar" network="goodreads" />
        <Icon url="/feed.xml" network="rss" />
    </Box>
)

const FooterLinks = ({ isLargeScreen }: { isLargeScreen: boolean }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: isLargeScreen ? 'flex-end' : 'center',
            flexGrow: 1
        }}
    >
        <FooterLink to="/uses">Uses</FooterLink>
        <FooterLink to="/kudos">Kudos</FooterLink>
        <FooterLink to="/values">Values</FooterLink>
        <FooterLink to="https://github.com/bluprince13/bluprince13-next">Source code</FooterLink>
        <FooterLink to="/privacypolicy">Privacy policy</FooterLink>
    </Box>
)

export default function Footer() {
    const isLargeScreen = useMediaQuery('(min-width:800px)')

    return (
        <Box sx={{ mt: 'auto' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Container maxWidth="lg">
                    <Divider />
                    <Toolbar>
                        {isLargeScreen && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
                                <Typography
                                    variant="body2"
                                    color="inherit"
                                    sx={{ pl: '1rem' }}
                                >
                                    &copy; {new Date().getFullYear()} {AUTHOR}
                                </Typography>
                            </Box>
                        )}
                        {isLargeScreen && <IconBar />}
                        <FooterLinks isLargeScreen={isLargeScreen} />
                    </Toolbar>
                </Container>
            </AppBar>
            {isLargeScreen || (
                <AppBar
                    position="static"
                    color="transparent"
                    elevation={0}
                    sx={{ m: '0.5rem' }}
                >
                    <IconBar />
                </AppBar>
            )}
        </Box>
    )
}
