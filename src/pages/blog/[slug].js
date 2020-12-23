import Head from 'next/head'
import { getAllPostSlugs, getPostDataAndContent } from '@Modules/posts'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import Comments from '@Components/common/Comments'
import Title from '@Components/common/Title'
import ShareBar from '@Components/ShareBar'
import Figure from '@Components/blog/Figure'
import Youtube from '@Components/blog/Youtube'

const components = { Figure, Youtube }

const SITE_ROOT = 'https://www.bluprince13.com'

export default function Posts({ source, data }) {
    const content = hydrate(source, { components })

    return (
        <div style={{ maxWidth: '960px', margin: 'auto' }}>
            <Head>
                <meta property="og:type" content="article" />
                <meta property="og:title" content={data.title} />
                <meta
                    property="og:description"
                    content={data.description}
                />
                <meta property="og:image" content={SITE_ROOT + data.banner} />
                <meta property="og:site_name" content="bluprince13" />
            </Head>
            <img
                style={{ width: '100%' }}
                id="banner"
                alt="banner"
                src={data.banner}
            />
            <Title title={data.title} />
            <span>{data.date}</span>
            <Comments.CommentCount id={data.slug} />
            {content}
            <ShareBar title={data.title} />
            <Comments.Embed id={data.slug} />
        </div>
    )
}
export async function getStaticPaths() {
    const paths = getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { data, content } = await getPostDataAndContent(params.slug)
    const mdxSource = await renderToString(content, {
        components,
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            data
        }
    }
}
