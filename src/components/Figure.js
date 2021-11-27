const Reference = ({ reference, referenceHref }) => (
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
        case 's':
            return '200px'
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
const Figure = ({
    src,
    alt,
    caption,
    href,
    reference,
    referenceHref,
    maxWidth,
    size = 'm'
}) => {
    const maxWidthToUse = maxWidth || getMaxWidth(size)

    return (
        <figure>
            <img
                src={src}
                alt={alt ?? caption}
                width="100%"
                style={{ maxWidth: maxWidthToUse }}
            />
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
