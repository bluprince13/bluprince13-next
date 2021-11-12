import makeStyles from '@mui/styles/makeStyles';

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
