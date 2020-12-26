import Link from 'next/link'

import Title from '@Components/Title'
import { getSortedPosts } from '@Modules/posts'
import generateRss from '@Modules/generateRss'
import StandardSeo from '@Components/StandardSeo'

const Blog = ({ allPostsData }) => {
    return (
        <div>
            <StandardSeo
                pageTitle="Blog"
                description="List of all my articles"
                path="/blog"
            />
            <Title title="Blog" />
            <br />
            All articles:
            <ul>
                {allPostsData.map(({ slug, title }) => (
                    <li key={slug}>
                        <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blog

export async function getStaticProps() {
    const allPostsData = getSortedPosts()
    await generateRss({ articles: allPostsData })
    return {
        props: {
            allPostsData
        }
    }
}
