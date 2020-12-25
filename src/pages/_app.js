import { useEffect } from 'react'
import Head from 'next/head'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'

import { StateProvider } from '@Modules/store'
import { initGA, logPageView } from '@Modules/googleAnalytics'
import SearchAppBar from '@Components/SearchAppBar/SearchAppBar'
import Footer from '@Components/Footer'

const Layout = ({ children }) => (
    <div
        style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
        }}
    >
        {children}
    </div>
)

const Content = ({ children }) => {
    return <div style={{ padding: '1rem' }}>{children}</div>
}

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    })

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
                <title>bluprince13</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
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
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <script
                    src="https://kit.fontawesome.com/a4e8fa8339.js"
                    crossOrigin="anonymous"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <StateProvider>
                    <Layout>
                        <SearchAppBar />
                        <Content>
                            <Component {...pageProps} />
                        </Content>
                        <Footer />
                    </Layout>
                </StateProvider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
