import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { getAllPostSlugs, getPostDataAndContent, getSortedPosts, getRelatedPosts } from '@Modules/posts'
import { generateMetadata as genMetadataHelper } from '@Modules/metadata'
import { evaluateBlogMdx } from '@Modules/mdx'
import { mdxComponents } from '@Modules/mdxComponents'
import { buildBlogUrl } from '@Modules/blogUrl'
import Title from '@Components/Title'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import BlogPostViewCounter from '@Components/blog/ViewCounter'
import { MyComments, MyCommentCount } from '@Components/Comments'
import Subscribe from '@Components/Subscribe'
import ShareBar from '@Components/ShareBar'
import { RelatedPosts } from '@Components/blog/RelatedPosts'

export async function generateStaticParams() {
    const paths = getAllPostSlugs()
    return paths.map(p => p.params)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { data } = getPostDataAndContent(slug)
    return genMetadataHelper({
        pageTitle: data.title,
        description: data.description,
        path: `/blog/${slug}`,
        bannerPath: data.banner,
    })
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { data, content } = getPostDataAndContent(slug)
    const [Post, relatedPosts] = await Promise.all([
        evaluateBlogMdx(content),
        Promise.resolve(getRelatedPosts(data, getSortedPosts()))
    ])

    return (
        <>
            <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: data.title }]} />
            <Image
                src={data.banner}
                alt="banner"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority
            />
            <Title title={data.title} />
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                <Box>
                    <div>{data.dateFormatted}</div>
                    <BlogPostViewCounter slug={data.slug} />
                    <MyCommentCount id={data.slug} />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {data.categories.map(cat => (
                        <Link key={cat} href={buildBlogUrl([cat])} style={{ textDecoration: 'none' }}>
                            <Chip label={cat} size="small" clickable />
                        </Link>
                    ))}
                </Box>
            </Box>
            <Post components={mdxComponents} />
            <ShareBar title={data.title} url={data.href} />
            <RelatedPosts posts={relatedPosts} />
            <Subscribe />
            <MyComments id={data.slug} />
        </>
    )
}
