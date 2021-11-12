import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
    palette: {},
    apps: {
        spanish: {
            columnWidth: '25%'
        }
    }
}))

theme.typography.h1.fontSize = '4rem'

export default theme
