/* eslint-disable @next/next/no-img-element */
import type { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import toc from 'remark-toc'
import emoji from 'remark-emoji'
import codesandbox from 'remark-codesandbox'
import prism from 'remark-prism'
import slug from 'rehype-slug'
import link from 'rehype-autolink-headings'

import {
    getAllPostSlugs,
    getPostDataAndContent,
    PostData
} from '@Modules/posts'
import { MyComments, MyCommentCount } from '@Components/Comments'
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
import { ComparisonTable } from '@Components/ComparisonTable'
import { Typography } from '@mui/material'
import 'prism-theme-night-owl'
import Link from 'next/link'

const components = {
    Figure,
    Youtube,
    Timeline,
    Table,
    Alert,
    ComparisonTable,
    Typography,
    Link
}

interface Props {
    mdxSource: MDXRemoteSerializeResult
    data: PostData
}

export default function Posts({ mdxSource, data }: Props) {
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
            <MyCommentCount id={data.slug} />
            <MDXRemote {...mdxSource} components={components} />
            <ShareBar title={data.title} url={data.href} />
            <Subscribe />
            <MyComments id={data.slug} />
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

export const getStaticProps: GetStaticProps<{
    mdxSource: MDXRemoteSerializeResult
}> = async ({ params }) => {
    const { data, content } = getPostDataAndContent(params!.slug)
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
            mdxSource,
            data
        }
    }
}
