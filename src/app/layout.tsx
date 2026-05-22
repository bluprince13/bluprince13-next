import '@fontsource/material-icons'
import '@Styles/globals.css'
import { Roboto } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { AppBody } from '@App/AppBody'
import { siteMetadata } from '@Modules/metadata'
import type { Metadata, Viewport } from 'next'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto'
})

export const metadata: Metadata = siteMetadata

export const viewport: Viewport = {
    themeColor: '#1976d2',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={`${roboto.variable} ${roboto.className}`}
        >
            <body>
                <InitColorSchemeScript attribute="data-theme" />
                <AppRouterCacheProvider>
                    <AppBody>{children}</AppBody>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
