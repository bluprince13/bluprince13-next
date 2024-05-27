import Head from 'next/head'
import { useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import '@Styles/globals.css'
import { AppBody } from 'src/app/AppBody'
import SEO from '@Modules/seo.config'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
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
            <AppBody>
                <Component {...pageProps} />
            </AppBody>
        </>
    )
}

export default MyApp
