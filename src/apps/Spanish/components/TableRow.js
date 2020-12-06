import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}))

export default function TableRow({ children }) {
    const classes = useStyles()

    return <div className={classes.root}>{children}</div>
}
