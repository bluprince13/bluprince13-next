'use client'

import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import appsData from '@Content/apps/appsData'
import AppCard from './AppCard'

const PREFIX = 'AppsList'

const classes = {
    root: `${PREFIX}-root`
}

const StyledList = styled(List)(({ theme }) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        maxWidth: 750,
        backgroundColor: theme.vars ? theme.vars.palette.background.paper : theme.palette.background.paper,
        margin: '0 auto'
    }
}))

const appsByNewest = [...appsData].sort((a, b) => b.created.localeCompare(a.created))

export default function AppsList() {
    return (
        <StyledList className={classes.root}>
            {appsByNewest.map((app) => (
                <ListItem key={app.title}>
                    <AppCard app={app} />
                </ListItem>
            ))}
        </StyledList>
    )
}
