'use client'

import { CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import AppBar from '@Components/appbar/AppBar'
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
    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>{children}</div>
        </div>
    )
}

export const AppBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Analytics />
            <GoogleAnalytics gaId="G-Y7P3Z69032" />
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <Layout>
                    <AppBar />
                    <Content>{children}</Content>
                    <Footer />
                    <SpeedInsights />
                </Layout>
            </CssVarsProvider>
        </>
    )
}
