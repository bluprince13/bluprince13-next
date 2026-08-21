'use client'

import { CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
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

// The gutter widens from `sm` up to give the 960px column room to breathe. The
// blog table-of-contents rail sits inside it, alongside space for an overlay
// scrollbar, so narrowing it will crowd the rail.
const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box component="main" sx={{ py: 2, px: { xs: 2, sm: 5 } }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>{children}</div>
        </Box>
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
