import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

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
