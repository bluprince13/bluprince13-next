import Head from 'next/head'
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
                    <title>{SEO.title}</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    <meta name="description" content={SEO.description} />
                    <link rel="canonical" href={SEO.canonical} />
                    <meta property="og:type" content={SEO.openGraph.type} />
                    <meta property="og:locale" content={SEO.openGraph.locale} />
                    <meta property="og:url" content={SEO.openGraph.url} />
                    <meta property="og:title" content={SEO.openGraph.title} />
                    <meta property="og:description" content={SEO.openGraph.description} />
                    {SEO.openGraph.images && SEO.openGraph.images.map((img, i) => (
                        <meta key={i} property="og:image" content={img.url} />
                    ))}
                    {SEO.openGraph.images && SEO.openGraph.images.map((img, i) => (
                        <meta key={`alt-${i}`} property="og:image:alt" content={img.alt} />
                    ))}
                    {SEO.twitter && (
                        <>
                            <meta name="twitter:creator" content={SEO.twitter.handle} />
                            <meta name="twitter:site" content={SEO.twitter.site} />
                            <meta name="twitter:card" content={SEO.twitter.cardType} />
                        </>
                    )}
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
                <AppBody>
                    <Component {...pageProps} />
                </AppBody>
            </div>
        </AppCacheProvider>
    )
}

export default MyApp
