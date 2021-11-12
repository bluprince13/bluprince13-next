import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {},
    apps: {
        spanish: {
            columnWidth: '25%'
        }
    }
})

theme.typography.h1.fontSize = '4rem'

export default theme
