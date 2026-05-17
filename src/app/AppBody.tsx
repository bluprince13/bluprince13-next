'use client'

import { CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import { StateProvider } from '@Modules/store'
import SearchAppBar from '@Components/SearchAppBar/SearchAppBar'
import Footer from '@Components/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => (
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

const Content = ({ children }: { children: React.ReactNode }) => {
    return <div style={{ padding: '1rem' }}>{children}</div>
}

export const AppBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Analytics />
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-Y7P3Z69032"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-Y7P3Z69032');
                `}
            </Script>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <StateProvider>
                    <Layout>
                        <SearchAppBar />
                        <Content>{children}</Content>
                        <Footer />
                        <SpeedInsights />
                    </Layout>
                </StateProvider>
            </CssVarsProvider>
        </>
    )
}
