import type { CSSProperties } from 'react'
import Image from 'next/image'
import Anchor from './Anchor'
import styles from './Figure.module.css'

const CITATION_SEPARATOR = ' · '

// Matches the markup remarkCitations produces for inline citations
const Reference = ({ reference, referenceHref }) => {
    if (!reference) return null
    const split = reference.indexOf(CITATION_SEPARATOR)
    const label =
        split > 0 ? (
            <>
                <span className="citation-publisher">{reference.slice(0, split)}</span>
                {reference.slice(split)}
            </>
        ) : (
            reference
        )
    return (
        <>
            {' '}
            <span className="citation">
                (<Anchor href={referenceHref ?? '#'}>{label}</Anchor>)
            </span>
        </>
    )
}

const Caption = ({ caption, href, reference, referenceHref }) => (
    <figcaption style={{ marginTop: '0.4em', fontSize: '0.875em', color: 'var(--mui-palette-text-primary)', fontStyle: 'italic' }}>
        {href ? <Anchor href={href}>{caption}</Anchor> : caption}
        <Reference reference={reference} referenceHref={referenceHref} />
    </figcaption>
)

export const getFigureMaxWidth = (size?: string) => {
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
    const maxWidthToUse = maxWidth || getFigureMaxWidth(size)
    const style: CSSProperties = { width: '100%', height: 'auto', display: 'block' }
    if (maxWidthToUse) style.maxWidth = maxWidthToUse
    if (align == 'center') style.margin = 'auto'
    const figureStyle: CSSProperties = { marginLeft: 0, marginRight: 0 }
    return (
        <figure style={figureStyle}>
            <Image
                src={src}
                alt={alt ?? caption ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                style={style}
                className={styles.image}
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
