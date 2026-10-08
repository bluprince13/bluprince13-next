'use client'
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

const PREFIX = 'Youtube'

const classes = {
    youtubeWrapper: `${PREFIX}-youtubeWrapper`
}

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

type YoutubeProps = { caption?: string } & ({ id: string; playlist?: never } | { id?: never; playlist: string })

const Youtube = ({ id, playlist, caption }: YoutubeProps) => {
    const src = playlist
        ? `https://www.youtube.com/embed/videoseries?list=${playlist}`
        : `https://www.youtube.com/embed/${id}`
    return (
        <Root>
            <div className={classes.youtubeWrapper}>
                <iframe
                    title={caption ?? id ?? playlist}
                    width="560"
                    height="315"
                    src={src}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {caption && <Typography variant="caption">{caption}</Typography>}
        </Root>
    )
}

export default Youtube
