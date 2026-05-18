'use client'
import { extendTheme } from '@mui/material/styles'

const theme = extendTheme({
    colorSchemeSelector: 'data-theme',
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
    }
})

export default theme
