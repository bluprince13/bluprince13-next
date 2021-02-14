import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Icon from '@Components/Icon'

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none'
        }
    }
}))

const AUTHOR = 'Vipin Ajayakumar'

// TODO: Make relative links work without page refresh
const FooterLink = ({ children, to }) => {
    const classes = useStyles()
    return (
        <a className={classes.link} href={to}>
            <Typography
                variant="body2"
                color="inherit"
                style={{ paddingLeft: '1rem' }}
            >
                {children}
            </Typography>
        </a>
    )
}

const IconBar = () => (
    <Box style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <Icon url="http://linkedin.com/in/vipinajayakumar" />
        <Icon url="https://twitter.com/vipinajayakumar" />
        <Icon url="https://github.com/bluprince13" />
        <Icon url="https://www.youtube.com/channel/UCyDgfMZyUxO6Ave0KxtxcCw" />
        <Icon
            url="https://letterboxd.com/vipinajayakumar/"
            network="letterboxd"
        />
        <Icon
            url="https://www.goodreads.com/user/show/18863116-vipin-ajayakumar"
            network="goodreads"
        />
        <Icon url="/feed.xml" network="rss" />
    </Box>
)

const FooterLinks = ({ isLargeScreen }) => (
    <Box
        style={{
            display: 'flex',
            justifyContent: isLargeScreen ? 'flex-end' : 'center',
            flexGrow: 1
        }}
    >
        <FooterLink to="/kudos">Kudos</FooterLink>
        <FooterLink to="/values">Values</FooterLink>
        <FooterLink to="https://github.com/bluprince13/bluprince13-next">
            Source code
        </FooterLink>
        <FooterLink to="/privacypolicy">Privacy policy</FooterLink>
    </Box>
)

export default function Footer() {
    const isLargeScreen = useMediaQuery('(min-width:800px)')

    return (
        <div style={{ marginTop: 'auto' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Container maxWidth="lg">
                    <Divider />
                    <Toolbar>
                        {isLargeScreen && (
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexGrow: 1
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="inherit"
                                    style={{ paddingLeft: '1rem' }}
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
                    style={{ margin: '0.5rem' }}
                >
                    <IconBar />
                </AppBar>
            )}
        </div>
    )
}
