import Link from 'next/link'

import Title from '@Components/Title'
import { getSortedPosts } from '@Modules/posts'
import { generateMetadata } from '@Modules/metadata'

export const dynamic = 'force-static'

export const metadata = generateMetadata({
    pageTitle: 'Blog',
    description: 'List of all my articles',
    path: '/blog'
})

const BlogPage = () => {
    const allPostsData = getSortedPosts()

    return (
        <>
            <Title title="Blog" />
            <br />
            All articles:
            <ul>
                {allPostsData.map(({ slug, title }) => (
                    <li key={slug}>
                        <Link href={`/blog/${slug}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BlogPage
