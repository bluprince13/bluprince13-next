import ReactGA from 'react-ga'

export const initGA = () => {
    ReactGA.initialize('UA-35322373-3', { debug: false })
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}
