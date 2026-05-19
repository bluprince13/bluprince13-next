import type { MetadataRoute } from 'next'
import { getSortedPosts } from '@Modules/posts'

const SITE_ROOT = 'https://bluprince13.com'

const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/apps', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/uses', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/cv', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/kudos', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/values', priority: 0.5, changeFrequency: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getSortedPosts()

    const postEntries: MetadataRoute.Sitemap = posts.map(({ slug }) => ({
        url: `${SITE_ROOT}/blog/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
        ({ path, priority, changeFrequency }) => ({
            url: `${SITE_ROOT}${path}`,
            changeFrequency,
            priority,
        })
    )

    return [...staticEntries, ...postEntries]
}
