import Head from 'next/head'

const BlogSeo = ({ pageTitle, description, date, url, bannerFullUrl }) => {
    const datePublished = new Date(date).toISOString();

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        author: {
            '@type': 'Person',
            name: 'Vipin Ajayakumar'
        },
        dateModified: datePublished,
        datePublished: datePublished,
        description: description,
        image: [bannerFullUrl],
        publisher: {
            '@type': 'Organization',
            name: 'Vipin Ajayakumar',
            logo: {
                '@type': 'ImageObject',
                url: 'https://bluprince13.com/favicon.ico'
            }
        },
        title: pageTitle,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url
        }
    }

    return (
        <Head>
            <title>{`${pageTitle} – Vipin Ajayakumar`}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={`${pageTitle} – Vipin Ajayakumar`} />
            <meta property="og:description" content={description} />
            {bannerFullUrl && <meta property="og:image" content={bannerFullUrl} />}
            {bannerFullUrl && <meta property="og:image:alt" content={pageTitle} />}
            <meta property="article:published_time" content={datePublished} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleJsonLd)
                }}
            />
        </Head>
    )
}

export default BlogSeo
