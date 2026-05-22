import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
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

const IconBar = ({ sx }: { sx?: object }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, ...sx }}>
        <Icon url="https://linkedin.com/in/vipinajayakumar" />
        <Icon url="https://twitter.com/vipinajayakumar" />
        <Icon url="https://github.com/bluprince13" />
        <Icon url="https://www.youtube.com/channel/UCyDgfMZyUxO6Ave0KxtxcCw" />
        <Icon url="https://letterboxd.com/vipinajayakumar/" network="letterboxd" />
        <Icon url="https://www.goodreads.com/user/show/18863116-vipin-ajayakumar" network="goodreads" />
        <Icon url="/feed.xml" network="rss" />
    </Box>
)

export default function Footer() {
    return (
        <Box sx={{ mt: 'auto' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Container maxWidth="lg">
                    <Divider />
                    <Toolbar>
                        {/* Copyright — large screens only */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start', flexGrow: 1 }}>
                            <Typography variant="body2" color="inherit" sx={{ pl: '1rem' }}>
                                &copy; {new Date().getFullYear()} {AUTHOR}
                            </Typography>
                        </Box>
                        {/* Icons inline — large screens only */}
                        <IconBar sx={{ display: { xs: 'none', md: 'flex' } }} />
                        {/* Links — centered on small, right-aligned on large */}
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, flexGrow: 1 }}>
                            <FooterLink to="/uses">Uses</FooterLink>
                            <FooterLink to="/kudos">Kudos</FooterLink>
                            <FooterLink to="/values">Values</FooterLink>
                            <FooterLink to="https://github.com/bluprince13/bluprince13-next">Source code</FooterLink>
                            <FooterLink to="/privacypolicy">Privacy policy</FooterLink>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Icons below — small screens only */}
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{ m: '0.5rem', display: { xs: 'block', md: 'none' } }}
            >
                <IconBar />
            </AppBar>
        </Box>
    )
}
