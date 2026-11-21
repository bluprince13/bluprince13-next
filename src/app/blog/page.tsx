import { Suspense } from 'react'

import Title from '@Components/Title'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import BlogIndex from '@Components/BlogIndex'
import { getSortedPosts } from '@Modules/posts'
import { generateMetadata } from '@Modules/metadata'
import { getCommentCounts } from '@Modules/hyvor'
import { getLifetimeViews } from '@Modules/views'

export const revalidate = 3600

export const metadata = generateMetadata({
    pageTitle: 'Blog',
    description: 'List of all my articles',
    path: '/blog'
})

const BlogPage = async () => {
    const allPostsData = getSortedPosts()
    const [viewCounts, commentCounts] = await Promise.all([
        getLifetimeViews(),
        getCommentCounts(),
    ])

    const posts = allPostsData.map(post => ({
        ...post,
        viewCount: viewCounts[post.slug] ?? 0,
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
