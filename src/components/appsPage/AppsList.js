import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import appsData from '@Content/apps/appsData'
import AppCard from './AppCard'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 750,
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto'
    }
}))

export default function FolderList() {
    const classes = useStyles()

    return (
        <List className={classes.root}>
            {appsData.map((app) => (
                <ListItem key={app.title}>
                    <AppCard app={app} />
                </ListItem>
            ))}
        </List>
    )
}
