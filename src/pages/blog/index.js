import Link from 'next/link'

import Title from '@Components/common/Title'
import { getSortedPosts } from '@Modules/posts'
import generateRss from '@Modules/generateRss'

export default ({ allPostsData }) => {
    return (
        <div>
            <Title title="Blog" />
            <br />
            All articles:
            <ul>
                {allPostsData.map(({ slug, date, title, excerpt }) => (
                    <li key={slug}>
                        <Link
                            href="/blog/[slug]"
                            as={`/blog/${slug}`}
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPosts()
    await generateRss({ articles: allPostsData })
    return {
        props: {
            allPostsData
        }
    }
}
