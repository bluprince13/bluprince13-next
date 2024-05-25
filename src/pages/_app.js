import { useEffect } from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { StateProvider } from '@Modules/store'
import { initGA, logPageView } from '@Modules/googleAnalytics'
import SearchAppBar from '@Components/SearchAppBar/SearchAppBar'
import Footer from '@Components/Footer'
import SEO from '@Modules/seo.config'

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
                    href="https://bluprince13.com/feed.xml"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="bluprince13 Atom feed"
                    href="https://bluprince13.com/atom.xml"
                />
                <link
                    rel="alternate"
                    type="application/json"
                    title="bluprince13 JSON feed"
                    href="https://bluprince13.com/feed.json"
                />
            </Head>
            <DefaultSeo {...SEO} />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <StateProvider>
                        <Layout>
                            <SearchAppBar />
                            <Content>
                                <Component {...pageProps} />
                            </Content>
                            <Footer />
                            <SpeedInsights />
                        </Layout>
                    </StateProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    )
}

export default MyApp
