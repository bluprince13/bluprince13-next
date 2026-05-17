'use client'
import { extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Theme {
        apps: { spanish: { columnWidth: string } }
    }
    interface CssVarsThemeOptions {
        apps?: { spanish?: { columnWidth?: string } }
    }
}

const theme = extendTheme({
    colorSchemeSelector: 'data-color-scheme',
    colorSchemes: {
        light: true,
        dark: {
            palette: {
                primary: {
                    main: '#90caf9',
                },
            },
        },
    },
    typography: {
        h1: { fontSize: '4rem' }
    },
    apps: {
        spanish: {
            columnWidth: '25%'
        }
    }
})

export default theme
