import Image from 'next/image'
import { getAllPostSlugs, getPostDataAndContent } from '@Modules/posts'
import { generateMetadata as genMetadataHelper } from '@Modules/metadata'
import { evaluateBlogMdx } from '@Modules/mdx'
import { mdxComponents } from '@Modules/mdxComponents'
import Title from '@Components/Title'
import ViewCounter from '@Components/blog/ViewCounter'
import { MyComments } from '@Components/Comments'
import Subscribe from '@Components/Subscribe'
import ShareBar from '@Components/ShareBar'

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
    const Post = await evaluateBlogMdx(content)

    return (
        <div style={{ maxWidth: '960px', margin: 'auto' }}>
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
            <div>{data.date}</div>
            <ViewCounter slug={data.slug} />
            <Post components={mdxComponents} />
            <ShareBar title={data.title} url={data.href} />
            <Subscribe />
            <MyComments id={data.slug} />
        </div>
    )
}
