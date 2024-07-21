import * as React from 'react'

interface IframeProps {
    src: string
}

export const Iframe: React.FC<IframeProps> = ({
    src
}) => (
    <div
        style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            paddingTop: '56.25%'
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
