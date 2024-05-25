import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'

const PREFIX = 'TableHeader';

const classes = {
    root: `${PREFIX}-root`,
    button: `${PREFIX}-button`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        '& > *': {
            margin: theme.spacing(1)
        },
        display: 'inline-block',
        width: theme.apps.spanish.columnWidth
    },

    [`& .${classes.button}`]: {
        width: '80%'
    }
}));

export default function TableHeader({ children, type = 'primary' }) {


    const color = type === 'title' ? 'primary' : 'secondary'

    return (
        <Root className={classes.root}>
            <Button
                variant="contained"
                color={color}
                className={classes.button}
            >
                {children}
            </Button>
        </Root>
    );
}
