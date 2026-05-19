'use client'

import {
    FacebookShareCount,
    RedditShareCount,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    RedditIcon
} from 'react-share'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const PREFIX = 'ShareBar'

const classes = {
    root: `${PREFIX}-root`,
    network: `${PREFIX}-network`,
    shareCount: `${PREFIX}-shareCount`,
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

    [`& .${classes.shareCount}`]: {
        display: 'inline-flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        overflow: 'visible',
        width: 0,
        marginTop: '3px',
        fontSize: '12px'
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
            <div className={classes.network}>
                <FacebookShareButton url={url} className={classes.shareButton}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <span>
                    <FacebookShareCount url={url} className={classes.shareCount}>
                        {(count) => count}
                    </FacebookShareCount>
                </span>
            </div>

            <div className={classes.network}>
                <TwitterShareButton url={url} title={title} className={classes.shareButton}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>

            <div className={classes.network}>
                <LinkedinShareButton url={url} className={classes.shareButton}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>

            <div className={classes.network}>
                <RedditShareButton
                    url={url}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className={classes.shareButton}
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>
                <span>
                    <RedditShareCount url={url} className={classes.shareCount} />
                </span>
            </div>
        </Root>
    )
}

export default ShareBar
