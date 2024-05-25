import { styled } from '@mui/material/styles';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const PREFIX = 'TableColumn';

const classes = {
    root: `${PREFIX}-root`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        width: theme.apps.spanish.columnWidth,
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block'
    }
}));

export default function TableColumn({ items }) {


    return (
        <Root className={classes.root}>
            <List component="nav" aria-label="label">
                {items.map((item) => (
                    <ListItem button key={item}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Root>
    );
}
