import { NextSeo, ArticleJsonLd } from 'next-seo'

const BlogSeo = ({ pageTitle, description, date, url, bannerFullUrl }) => {
    const datePublished = new Date(date).toISOString();

    const featuredImage = {
        url: bannerFullUrl,
        alt: pageTitle
    }

    return (
        <>
            <NextSeo
                title={`${pageTitle} – Vipin Ajayakumar`}
                description={description}
                canonical={url}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: datePublished
                    },
                    url,
                    pageTitle,
                    description,
                    images: [featuredImage]
                }}
            />
            <ArticleJsonLd
                authorName="Vipin Ajayakumar"
                dateModified={datePublished}
                datePublished={datePublished}
                description={description}
                images={[featuredImage]}
                publisherLogo="/favicon.ico"
                publisherName="Vipin Ajayakumar"
                title={pageTitle}
                url={url}
            />
        </>
    )
}

export default BlogSeo
