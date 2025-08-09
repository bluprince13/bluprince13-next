/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @next/next/no-img-element */
const Reference = ({
    reference,
    referenceHref
}: {
    reference: string
    referenceHref: string
}) => (
    <span>
        {' '}
        {referenceHref ? (
            <a href={referenceHref}>{`[${reference}]`}</a>
        ) : (
            [reference]
        )}
    </span>
)

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
            return ''
        case 'm':
        default:
            return '350px'
    }
}

// TODO: Use https://nextjs.org/docs/api-reference/next/image when it's able to
// infer width and height automatically.
// See https://github.com/vercel/next.js/issues/18497
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
    const style: { margin?: string; display?: string; maxWidth?: string } = {
        maxWidth: maxWidthToUse
    }
    if (align == 'center') {
        style.margin = 'auto'
        style.display = 'block'
    }
    return (
        <figure style={{ marginLeft: 0, marginRight: 0 }}>
            <img src={src} alt={alt ?? caption} width="100%" style={style} />
            {caption ? (
                <Caption
                    caption={caption}
                    href={href}
                    reference={reference}
                    referenceHref={referenceHref}
                />
            ) : (
                ''
            )}
        </figure>
    )
}

export default Figure
