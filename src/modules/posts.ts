import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

const postDirectory = path.join(process.cwd(), 'src/content/blog')
const { SITE_ROOT } = process.env

export type PostData = {
    slug: string
    dateFormatted: string
    dateISO: string
    banner: string
    href: string
    title: string
    description: string
    bannerFullUrl: string
    bibliography?: string
    categories: string[]
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
export const getPostDataAndContent = cache((slug): GetPostDataAndContentOutput => {
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
        dateFormatted: formattedDate,
        dateISO: data.date,
        bannerFullUrl: `${SITE_ROOT}${data.banner}`,
        bibliography: data.bibliography ? `${SITE_ROOT}${data.bibliography}` : null,
        href: `${SITE_ROOT}/blog/${slug}`,
        categories: data.categories ?? []
    }

    return { data: modifiedData as unknown as PostData, content }
})
export const getSortedPosts = cache(() => {
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map((filename) => {
        const slug = filename.replace('.mdx', '')
        const { data } = getPostDataAndContent(slug)
        return data
    })

    return allPostsData.sort((a, b) =>
        new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    )
})

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

export function getRelatedPosts(current: PostData, all: PostData[]): PostData[] {
    const others = all.filter(p => p.slug !== current.slug)
    const currentCats = new Set(current.categories ?? [])

    const scored = others.map(p => ({
        post: p,
        score: (p.categories ?? []).filter(c => currentCats.has(c)).length
    }))

    scored.sort((a, b) =>
        b.score !== a.score
            ? b.score - a.score
            : new Date(b.post.dateISO).getTime() - new Date(a.post.dateISO).getTime()
    )

    const related = scored.filter(x => x.score > 0).slice(0, 3).map(x => x.post)
    return related.length > 0 ? related : others.slice(0, 3)
}
