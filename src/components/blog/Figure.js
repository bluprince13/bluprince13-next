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

export default ({ src, alt, caption, href, reference, referenceHref }) => (
    <figure>
        <img
            src={src}
            alt={alt ?? caption}
            width="100%"
            style={{ maxWidth: '500px' }}
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