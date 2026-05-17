'use client'

import { CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"

import { StateProvider } from '@Modules/store'
import { GoogleAnalytics } from '@next/third-parties/google'
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
            <GoogleAnalytics gaId="G-XXXXXXXXXX" />
            <Analytics />
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
