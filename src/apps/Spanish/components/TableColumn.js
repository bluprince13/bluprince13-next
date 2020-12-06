import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.apps.spanish.columnWidth,
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block'
    }
}))

export default function TableColumn({ items }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="label">
                {items.map((item) => (
                    <ListItem button key={item}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
