import { styled } from '@mui/material/styles';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import appsData from '@Content/apps/appsData'
import AppCard from './AppCard'

const PREFIX = 'AppsList';

const classes = {
    root: `${PREFIX}-root`
};

const StyledList = styled(List)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        maxWidth: 750,
        backgroundColor: theme.palette.background.paper,
        margin: '0 auto'
    }
}));

export default function FolderList() {


    return (
        <StyledList className={classes.root}>
            {appsData.map((app) => (
                <ListItem key={app.title}>
                    <AppCard app={app} />
                </ListItem>
            ))}
        </StyledList>
    );
}
