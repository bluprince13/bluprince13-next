import { DEFAULT_SORT, type Sort } from '@Modules/blogSort'

export function buildBlogUrl(tags: string[], sort?: Sort): string {
    const params = new URLSearchParams()
    tags.forEach(t => params.append('tag', t))
    if (sort && sort.field !== DEFAULT_SORT.field) params.set('sort', sort.field)
    if (sort && sort.direction !== DEFAULT_SORT.direction) params.set('dir', sort.direction)

    const query = params.toString()
    return query ? `/blog?${query}` : '/blog'
}
