import type { CSSProperties } from 'react'
import Image from 'next/image'

const Reference = ({ reference, referenceHref }) =>
    reference
        ? (
            <small>
                {' '}
                [<a href={referenceHref ?? '#'}>{reference}</a>]
            </small>
        )
        : null

const Caption = ({ caption, href, reference, referenceHref }) => (
    <figcaption>
        {href ? <a href={href}>{caption}</a> : caption}
        <Reference reference={reference} referenceHref={referenceHref} />
    </figcaption>
)

const getMaxWidth = (size) => {
    switch (size) {
        case 'xs':
            return '75px'
        case 's':
            return '200px'
        case 'ml':
            return '500px'
        case 'l':
            return undefined
        case 'm':
        default:
            return '350px'
    }
}

type FigureProps = {
    src: string
    alt?: string
    caption?: string
    href?: string
    reference?: string
    referenceHref?: string
    maxWidth?: string
    size?: 'xs' | 's' | 'm' | 'ml' | 'l'
    align?: 'center'
}

const Figure = ({
    src,
    alt,
    caption,
    href,
    reference,
    referenceHref,
    maxWidth,
    size = 'm',
    align
}: FigureProps) => {
    const maxWidthToUse = maxWidth || getMaxWidth(size)
    const style: CSSProperties = { width: '100%', height: 'auto' }
    if (maxWidthToUse) style.maxWidth = maxWidthToUse
    if (align == 'center') {
        style.margin = 'auto'
        style.display = 'block'
    }
    return (
        <figure style={{ marginLeft: 0, marginRight: 0 }}>
            <Image
                src={src}
                alt={alt ?? caption ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                style={style}
            />
            {caption && (
                <Caption
                    caption={caption}
                    href={href}
                    reference={reference}
                    referenceHref={referenceHref}
                />
            )}
        </figure>
    )
}

export default Figure
