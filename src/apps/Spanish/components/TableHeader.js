import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
        display: 'inline-block',
        width: theme.apps.spanish.columnWidth
    },
    button: {
        width: '80%'
    }
}))

export default function TableHeader({ children, type = 'primary' }) {
    const classes = useStyles()

    const color = type === 'title' ? 'primary' : 'secondary'

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color={color}
                className={classes.button}
            >
                {children}
            </Button>
        </div>
    )
}
