import { NextSeo } from 'next-seo'

const SITE_ROOT = 'https://www.bluprince13.com'

const StandardSeo = ({ pageTitle, description, path }) => {
    const title = `${pageTitle} - bluprince13`
    const url = `${SITE_ROOT}${path}`
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
        />
    )
}

export default StandardSeo
