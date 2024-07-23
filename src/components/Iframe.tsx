import * as React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Figure from './Figure'

interface IframeProps {
    src: string
    staticSrc: string
}

export const Iframe: React.FC<IframeProps> = ({ src, staticSrc }) => {
    const isMobile = useMediaQuery('(max-width:600px)')

    return isMobile && staticSrc ? (
        <Figure src={staticSrc} size="l" />
    ) : (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                paddingTop: '56.25%',
                minWidth: '300px'
            }}
        >
            <iframe
                style={{
                    border: 0,
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    width: '100%',
                    height: '100%'
                }}
                src={src}
            ></iframe>
        </div>
    )
}
