import Head from 'next/head'
import { getAllPostSlugs, getPostdata } from '@Modules/posts'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import Typography from '@material-ui/core/Typography'

import { store } from '@Modules/store'
import Comments from '@Components/common/Comments'
import Title from '@Components/common/Title'
import ShareBar from '@Components/ShareBar'
import Figure from '@Components/blog/Figure'

const components = { Figure }

export default function Posts({ source, frontMatter }) {
    const content = hydrate(source, { components })

    // const {
    //     state: { hitCount }
    // } = useContext(store)
    // const location = useLocation()
    // const { siteRoot } = useSiteData()
    return (
        <>
            <Head>
                {/* <meta property="og:url" content={location.href} /> */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={frontMatter.title} />
                {/* <meta property="og:description" content={article.description} /> */}
                {/* <meta property="og:image" content={siteRoot + article.banner} /> */}
                <meta property="og:site_name" content="bluprince13" />
            </Head>
            <img
                style={{ width: '100%' }}
                id="banner"
                alt="banner"
                src={frontMatter.banner}
            />
            <Title title={frontMatter.title} />
            <span>{frontMatter.date}</span>
            {/* {hitCount ? (
                <Typography variant="body2">Hit count {hitCount}</Typography>
            ) : (
                ''
            )} */}
            <Comments.CommentCount id={frontMatter.path} />
            {content}
            <ShareBar title={frontMatter.title} />
            <Comments.Embed id={frontMatter.path} />
        </>
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
    const postContent = await getPostdata(params.slug)
    const { data, content } = matter(postContent)
    const mdxSource = await renderToString(content, {
        components,
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}
