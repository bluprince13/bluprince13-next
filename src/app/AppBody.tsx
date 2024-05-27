import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@Modules/theme'
import '@Styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { StateProvider } from '@Modules/store'
import { GoogleAnalytics } from '@Components/GoogleAnalytics'
import SearchAppBar from '@Components/SearchAppBar/SearchAppBar'
import Footer from '@Components/Footer'
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

export const AppBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <GoogleAnalytics />
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <StateProvider>
                        <Layout>
                            <SearchAppBar />
                            <Content>{children}</Content>
                            <Footer />
                            <SpeedInsights />
                        </Layout>
                    </StateProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </>
    )
}
