import { SocialIcon } from 'react-social-icons'
import { Box } from '@mui/material'
import Image from 'next/image'

import GoodReadsIcon from './goodreads.svg'
import LetterboxdIcon from './letterboxd.svg'

const sx = {
    display: 'inline-block',
    marginRight: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.75
    }
}

const SIZE = 30

const CustomIconMap = {
    goodreads: GoodReadsIcon,
    letterboxd: LetterboxdIcon
}

const CustomIcon = ({ url, network }) => {
    return (
        <Box component="a" href={url} sx={sx}>
            <Image
                src={CustomIconMap[network]}
                height={SIZE}
                width={SIZE}
                alt={network}
            />
        </Box>
    )
}

const Icon = ({ url, network }) => {
    if (network in CustomIconMap) {
        return <CustomIcon url={url} network={network} />
    }
    return (
        <Box sx={sx}>
            <SocialIcon
                url={url}
                network={network}
                style={{ height: SIZE, width: SIZE }}
            />
        </Box>
    )
}

export default Icon
