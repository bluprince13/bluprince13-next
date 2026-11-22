'use client'

import {
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    XShareButton,
    FacebookLegacyIcon,
    XLegacyIcon,
    LinkedinLegacyIcon,
    RedditLegacyIcon
} from 'react-share'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const PREFIX = 'ShareBar'

const classes = {
    root: `${PREFIX}-root`,
    network: `${PREFIX}-network`,
    shareButton: `${PREFIX}-shareButton`
}

const Root = styled('div')(() => ({
    [`&.${classes.root}`]: { marginBottom: 0 },

    [`& .${classes.network}`]: {
        verticalAlign: 'top',
        display: 'inline-block',
        marginRight: '10px',
        textAlign: 'center'
    },

    [`& .${classes.shareButton}`]: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.75
        }
    }
}))

const ShareBar = ({ title, url }: { title: string; url: string }) => {
    return (
        <Root className={classes.root}>
            <div>
                <Typography variant="overline">
                    Please share! <span role="img" aria-label="folded hands">🙏</span>
                </Typography>
            </div>
            <div className={classes.network} data-umami-event="share-click" data-umami-event-network="facebook">
                <FacebookShareButton url={url} className={classes.shareButton}>
                    <FacebookLegacyIcon size={32} round />
                </FacebookShareButton>
            </div>

            <div className={classes.network} data-umami-event="share-click" data-umami-event-network="twitter">
                <XShareButton url={url} text={title} className={classes.shareButton}>
                    <XLegacyIcon size={32} round />
                </XShareButton>
            </div>

            <div className={classes.network} data-umami-event="share-click" data-umami-event-network="linkedin">
                <LinkedinShareButton url={url} className={classes.shareButton}>
                    <LinkedinLegacyIcon size={32} round />
                </LinkedinShareButton>
            </div>

            <div className={classes.network} data-umami-event="share-click" data-umami-event-network="reddit">
                <RedditShareButton
                    url={url}
                    shareTitle={title}
                    windowWidth={660}
                    windowHeight={460}
                    className={classes.shareButton}
                >
                    <RedditLegacyIcon size={32} round />
                </RedditShareButton>
            </div>
        </Root>
    )
}

export default ShareBar
