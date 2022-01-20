import { NextSeo } from 'next-seo'

const SITE_ROOT = 'https://bluprince13.com'

const StandardSeo = ({ pageTitle, description, path, bannerPath }) => {
    const title = `${pageTitle} - Vipin Ajayakumar`
    const url = `${SITE_ROOT}${path}`

    const featuredImage = {
        url: `${SITE_ROOT}${bannerPath}`,
        alt: title
    }

    return (
        <NextSeo
            title={title}
            description={description}
            canonical={url}
            openGraph={{
                url,
                title,
                description
            }}
            images={bannerPath && [featuredImage]}
        />
    )
}

export default StandardSeo
