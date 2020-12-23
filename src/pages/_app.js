import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '@Modules/theme'
import '../styles/globals.css'
import { store, StateProvider } from '@Modules/store'
import SearchAppBar from '@Components/common/SearchAppBar'
import Footer from '@Components/common/Footer'

const Container = ({ children }) => (
    <div
        style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        }}
    >
        {children}{' '}
    </div>
)

const Content = ({ children }) => {
    const { asPath } = useRouter()

    useEffect(() => {
        ReactGA.pageview(asPath)
    }, [asPath])

    return <div style={{ padding: '1rem' }}>{children}</div>
}

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <title>bluprince13</title>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="bluprince13 RSS feed"
                    href="https://www.bluprince13.com/feed.xml"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="bluprince13 Atom feed"
                    href="https://www.bluprince13.com/atom.xml"
                />
                <link
                    rel="alternate"
                    type="application/json"
                    title="bluprince13 JSON feed"
                    href="https://www.bluprince13.com/feed.json"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <StateProvider>
                    <Container>
                        <SearchAppBar />
                        <Content>
                            <Component {...pageProps} />
                        </Content>
                        <Footer />
                    </Container>
                </StateProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
