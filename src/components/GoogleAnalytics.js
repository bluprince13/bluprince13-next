'use client';

import ReactGA from 'react-ga'
import { useEffect } from 'react'

export const initGA = () => {
    ReactGA.initialize('UA-35322373-3', { debug: false })
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

export const GoogleAnalytics = () => {
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    })
    return null
}
