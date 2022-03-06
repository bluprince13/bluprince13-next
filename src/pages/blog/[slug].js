import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

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
import ViewCounter from '@Components/blog/ViewCounter'
import BlogSeo from '@Components/blog/BlogSeo'
import Subscribe from '@Components/Subscribe'

import Figure from '@Components/Figure'
import Youtube from '@Components/Youtube'
import Timeline from '@Components/Timeline'
import Table from '@Components/Table'
import Alert from '@Components/Alert'

import 'prism-theme-night-owl'

const components = { Figure, Youtube, Timeline, Table, Alert }
export default function Posts({ source, data }) {
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
            <MDXRemote {...source} components={components} />
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
    const mdxSource = await serialize(content, {
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
