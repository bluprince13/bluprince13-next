import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import toc from 'remark-toc'
import emoji from 'remark-emoji'
import codesandbox from 'remark-codesandbox'
import prism from 'remark-prism'
import slug from 'rehype-slug'
import link from 'rehype-autolink-headings'

import { getAllPostSlugs, getPostDataAndContent } from '@Modules/posts'
import Comments from '@Components/Comments'
import Title from '@Components/Title'
import ShareBar from '@Components/ShareBar'
import Figure from '@Components/blog/Figure'
import Youtube from '@Components/blog/Youtube'
import ViewCounter from '@Components/blog/ViewCounter'
import BlogSeo from '@Components/blog/BlogSeo'
import Subscribe from '@Components/Subscribe'

import 'prism-theme-night-owl'

const components = { Figure, Youtube }
export default function Posts({ source, data }) {
    const content = hydrate(source, { components })

    return (
        <div style={{ maxWidth: '960px', margin: 'auto' }}>
            <BlogSeo
                pageTitle={data.title}
                description={data.description}
                date={data.date}
                url={data.href}
                bannerFullUrl={data.bannerFullUrl}
            />
            <img
                style={{ width: '100%' }}
                id="banner"
                alt="banner"
                src={data.banner}
            />
            <Title title={data.title} />
            <div>{data.date}</div>
            <ViewCounter slug={data.slug} />
            <Comments.CommentCount id={data.slug} />
            {content}
            <ShareBar title={data.title} url={data.href} />
            <Subscribe />
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
    const { data, content } = getPostDataAndContent(params.slug)
    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            remarkPlugins: [
                [toc, { tight: true }],
                [emoji, { emoticon: true }],
                [codesandbox, { mode: 'button' }],
                [prism]
            ],
            rehypePlugins: [
                slug,
                [
                    link,
                    {
                        behaviour: 'append',
                        properties: { ariaHidden: 'false', tabIndex: -1 },
                        content: {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                                className: ['anchor', 'fas', 'fa-link']
                            },
                            children: []
                        }
                    }
                ]
            ]
        },
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            data
        }
    }
}
