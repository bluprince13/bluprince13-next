import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postDirectory = path.join(process.cwd(), 'src/content/blog')
const SITE_ROOT = 'https://www.bluprince13.com'

export const getFileContent = (slug) => {
    const fullPath = path.join(postDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    return fileContent
}
export const getPostDataAndContent = (slug) => {
    const fileContent = getFileContent(slug)
    const { data, content } = matter(fileContent)
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = new Date(data.date).toLocaleDateString(
        'en-IN',
        options
    )
    const modifiedData = {
        slug,
        ...data,
        date: formattedDate,
        href: `${SITE_ROOT}/blog/${slug}`
    }

    return { data: modifiedData, content }
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
