export function buildTagUrl(tags: string[]): string {
    if (tags.length === 0) return '/blog'
    const params = new URLSearchParams()
    tags.forEach(t => params.append('tag', t))
    return `/blog?${params}`
}
