/* eslint-disable react/no-unescaped-entities */
import React from 'react'
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
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Emoji from 'a11y-react-emoji'

const useStyles = makeStyles(() => ({
    root: {},
    network: {
        verticalAlign: 'top',
        display: 'inline-block',
        marginRight: '10px',
        textAlign: 'center'
    },
    shareCount: {
        display: 'inline-flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        overflow: 'visible',
        width: 0,
        marginTop: '3px',
        fontSize: '12px'
    },
    shareButton: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.75
        }
    }
}))

export default ({ title, url }) => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <Typography variant="overline">
                        Please share! <Emoji symbol="🙏" label="folded hands" />
                    </Typography>
                </div>
                <div className={classes.network}>
                    <FacebookShareButton
                        url={url}
                        quote={title}
                        className={classes.shareButton}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <div>
                        <FacebookShareCount
                            url={url}
                            className={classes.shareCount}
                        >
                            {(count) => count}
                        </FacebookShareCount>
                    </div>
                </div>

                <div className={classes.network}>
                    <TwitterShareButton
                        url={url}
                        title={title}
                        className={classes.shareButton}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>

                <div className={classes.network}>
                    <LinkedinShareButton
                        url={url}
                        className={classes.shareButton}
                    >
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

                    <div>
                        <RedditShareCount
                            url={url}
                            className={classes.shareCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
