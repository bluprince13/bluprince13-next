import { Suspense } from 'react'

import Title from '@Components/Title'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import BlogIndex from '@Components/BlogIndex'
import { getSortedPosts } from '@Modules/posts'
import { generateMetadata } from '@Modules/metadata'
import { getCommentCounts } from '@Modules/hyvor'
import db from '@Modules/firebase'

export const revalidate = 3600

export const metadata = generateMetadata({
    pageTitle: 'Blog',
    description: 'List of all my articles',
    path: '/blog'
})

const BlogPage = async () => {
    const allPostsData = getSortedPosts()
    const [snapshot, commentCounts] = await Promise.all([
        db.ref('views').once('value'),
        getCommentCounts(),
    ])
    const viewCounts: Record<string, number> = snapshot.val() ?? {}

    const posts = allPostsData.map(post => ({
        ...post,
        initialViewCount: viewCounts[post.slug],
        commentCount: commentCounts[post.slug] ?? 0,
    }))

    return (
        <>
            <Breadcrumbs items={[{ label: 'Blog' }]} />
            <Title title="Blog" />
            <Suspense>
                <BlogIndex posts={posts} />
            </Suspense>
        </>
    )
}

export default BlogPage
