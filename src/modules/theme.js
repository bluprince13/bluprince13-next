import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {},
    apps: {
        spanish: {
            columnWidth: '25%'
        }
    }
})

theme.typography.h1.fontSize = '4rem'

export default theme
