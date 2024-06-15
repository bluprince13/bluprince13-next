import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'src/content/blog')
const { SITE_ROOT } = process.env

export type PostData = {
    slug: string
    date: string
    banner: string
    href: string
    title: string
    description: string
    bannerFullUrl: string
    bibliography?: string
}

export type PostContent = string

export type GetPostDataAndContentOutput = {
    data: PostData
    content: PostContent
}

export const getFileContent = (slug) => {
    const fullPath = path.join(postDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    return fileContent
}
export const getPostDataAndContent = (slug): GetPostDataAndContentOutput => {
    const fileContent = getFileContent(slug)
    const { data, content } = matter(fileContent)
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    const formattedDate = new Date(data.date).toLocaleDateString(
        'en-GB',
        options
    )
    const modifiedData = {
        slug,
        ...data,
        date: formattedDate,
        bannerFullUrl: `${SITE_ROOT}${data.banner}`,
        bibliography: data.bibliography ? `${SITE_ROOT}${data.bibliography}` : null,
        href: `${SITE_ROOT}/blog/${slug}`
    }

    return { data: modifiedData as unknown as PostData, content }
}
export const getSortedPosts = () => {
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map((filename) => {
        const slug = filename.replace('.mdx', '')
        const { data } = getPostDataAndContent(slug)
        return data
    })

    return allPostsData.sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
            return 1
        }
        return -1
    })
}

export const getAllPostSlugs = () => {
    const fileNames = fs.readdirSync(postDirectory)
    return fileNames.map((filename) => {
        return {
            params: {
                slug: filename.replace('.mdx', '')
            }
        }
    })
}
