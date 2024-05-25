import { styled } from '@mui/material/styles';
const PREFIX = 'TableRow';

const classes = {
    root: `${PREFIX}-root`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
}));

export default function TableRow({ children }) {


    return <Root className={classes.root}>{children}</Root>;
}
