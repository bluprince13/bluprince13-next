import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { Roboto } from 'next/font/google'
import { AppCacheProvider } from '@mui/material-nextjs/v16-pagesRouter'
import '@fontsource/material-icons'
import '@Styles/globals.css'
import { AppBody } from 'src/app/AppBody'
import SEO from '@Modules/seo.config'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap'
})

function MyApp({ Component, pageProps, ...props }) {
    return (
        <AppCacheProvider {...props}>
            <div className={roboto.className}>
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
            </div>
        </AppCacheProvider>
    )
}

export default MyApp
