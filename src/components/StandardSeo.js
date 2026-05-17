import Head from 'next/head'

const SITE_ROOT = 'https://bluprince13.com'

const StandardSeo = ({ pageTitle, description, path, bannerPath }) => {
    const title = `${pageTitle} - Vipin Ajayakumar`
    const url = `${SITE_ROOT}${path}`

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {bannerPath && <meta property="og:image" content={`${SITE_ROOT}${bannerPath}`} />}
            {bannerPath && <meta property="og:image:alt" content={title} />}
        </Head>
    )
}

export default StandardSeo
