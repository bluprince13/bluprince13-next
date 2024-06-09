import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material'

const PREFIX = 'Youtube';

const classes = {
    youtubeWrapper: `${PREFIX}-youtubeWrapper`
};

const Root = styled('div')(() => ({
    [`& .${classes.youtubeWrapper}`]: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
        }
    }
}))

const Youtube = ({ id, caption }) => {

    return (
        <Root>
            <div className={classes.youtubeWrapper}>
                <iframe
                    title={id}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {caption && <Typography variant="caption">{caption}</Typography>}
        </Root>
    );
}

export default Youtube
