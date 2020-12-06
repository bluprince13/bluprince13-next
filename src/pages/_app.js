import { useContext, useEffect } from 'react'

import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto'

import theme from '@Modules/theme'
import { store, StateProvider } from '@Modules/store'
import SearchAppBar from '@Components/common/SearchAppBar'
import Footer from '@Components/common/Footer'
// import getHitCount from '@Modules/getHitCount'

const Container = ({ children }) => (
  <div
      style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column'
      }}
  >
      {children}{' '}
  </div>
)

const Content = ({ children }) => {
  // const location = useLocation()
  // const { dispatch } = useContext(store)

  // useEffect(() => {
  //     ReactGA.pageview(location.pathname + location.search)
  //     getHitCount({ url: location.href, dispatch })
  // }, [dispatch, location])

  return <div style={{ padding: '1rem' }}>{children}</div>
}

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StateProvider>
                <Container>
                    <SearchAppBar />
                    <Content>
                        <Component {...pageProps} />
                    </Content>
                    <Footer />
                </Container>
            </StateProvider>
        </ThemeProvider>
    )
}

export default MyApp
