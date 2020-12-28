import { SocialIcon } from 'react-social-icons'
import { makeStyles } from '@material-ui/core/styles'

import GoodReadsIcon from './goodreads.svg'
import LetterboxdIcon from './letterboxd.svg'

const useStyles = makeStyles(() => ({
    socialIcon: {
        display: 'inline-block',
        marginRight: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.75
        }
    }
}))

const SIZE = 30

const CustomIconMap = {
    goodreads: GoodReadsIcon,
    letterboxd: LetterboxdIcon
}

const CustomIcon = ({ url, network }) => {
    const classes = useStyles()
    return (
        <a href={url}>
            <img
                className={classes.socialIcon}
                src={CustomIconMap[network]}
                height={SIZE}
                width={SIZE}
                alt={network}
            />
        </a>
    )
}

const Icon = ({ url, network }) => {
    const classes = useStyles()
    if (network in CustomIconMap) {
        return CustomIcon({ url, network })
    }
    return (
        <SocialIcon
            className={classes.socialIcon}
            url={url}
            network={network}
            style={{ height: SIZE, width: SIZE }}
        />
    )
}

export default Icon
