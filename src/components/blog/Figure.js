export default ({ src, alt, caption }) => (
    <figure>
        <img src={src} alt={alt} width="100%" style={{ maxWidth: '500px' }} />
        <figcaption>{caption}</figcaption>
    </figure>
)
