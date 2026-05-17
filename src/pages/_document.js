import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
    DocumentHeadTags,
    documentGetInitialProps
} from '@mui/material-nextjs/v15-pagesRouter'
import Script from 'next/script'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" suppressHydrationWarning>
                <Head>
                    <meta name="theme-color" content="#1976d2" />
                    <Script
                        src="https://kit.fontawesome.com/a4e8fa8339.js"
                        crossOrigin="anonymous"
                        strategy="beforeInteractive"
                    />
                    <DocumentHeadTags {...this.props} />
                </Head>
                <body>
                    <InitColorSchemeScript attribute="data-color-scheme" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const finalProps = await documentGetInitialProps(ctx)
    return finalProps
}

export default MyDocument
