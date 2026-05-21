import * as pagefind from 'pagefind'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function stripMarkdown(text) {
    return text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/[*_~>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

function readMdxText(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8')
    // Strip import lines and JSX component tags
    const cleaned = raw
        .replace(/^import\s.*$/gm, '')
        .replace(/<[A-Z][^>]*\/>/g, '')
        .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, '')
    return stripMarkdown(cleaned)
}

const { index } = await pagefind.createIndex()

// Blog posts
const blogDir = path.join(root, 'src/content/blog')
for (const file of fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))) {
    const slug = file.replace('.mdx', '')
    const { data, content } = matter(fs.readFileSync(path.join(blogDir, file), 'utf8'))
    await index.addCustomRecord({
        url: `/blog/${slug}`,
        content: stripMarkdown(content),
        language: 'en',
        meta: { title: data.title, image: data.banner },
        filters: {
            category: data.categories ?? [],
            type: ['blog'],
        },
        sort: { date: data.date },
    })
}

// Static pages
await index.addCustomRecord({
    url: '/cv',
    content: 'CV resume work experience software engineer download latex',
    language: 'en',
    meta: { title: 'CV' },
    filters: { type: ['page'] },
})

await index.addCustomRecord({
    url: '/values',
    content: readMdxText(path.join(root, 'src/app/values/content.mdx')),
    language: 'en',
    meta: { title: 'Values' },
    filters: { type: ['page'] },
})

await index.addCustomRecord({
    url: '/kudos',
    content: readMdxText(path.join(root, 'src/app/kudos/content.mdx')),
    language: 'en',
    meta: { title: 'Kudos' },
    filters: { type: ['page'] },
})

// Uses: extract app names, use-cases, and descriptions from the TypeScript data file
const usesRaw = fs.readFileSync(path.join(root, 'src/content/uses.ts'), 'utf8')
const appNames = [...usesRaw.matchAll(/appName:\s*'([^']+)'/g)].map(m => m[1])
const appUses = [...usesRaw.matchAll(/\buse:\s*'([^']+)'/g)].map(m => m[1])
const appDescriptions = [...usesRaw.matchAll(/description:\s*`([^`]*)`/gs)].map(m =>
    stripMarkdown(m[1])
)
const usesContent = appNames
    .map((name, i) => [name, appUses[i] ?? '', appDescriptions[i] ?? ''].join(' '))
    .join('. ')

await index.addCustomRecord({
    url: '/uses',
    content: usesContent,
    language: 'en',
    meta: { title: 'Uses' },
    filters: { type: ['page'] },
})

await index.writeFiles({ outputPath: path.join(root, 'public/pagefind') })
await pagefind.close()
console.log('✓ Search index written to public/pagefind/')
