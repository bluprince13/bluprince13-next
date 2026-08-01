export const SORT_FIELDS = ['date', 'views', 'comments'] as const

export type SortField = (typeof SORT_FIELDS)[number]
export type SortDirection = 'asc' | 'desc'
export type Sort = { field: SortField; direction: SortDirection }

export const DEFAULT_SORT: Sort = { field: 'date', direction: 'desc' }

export const SORT_LABELS: Record<SortField, string> = {
    date: 'Date',
    views: 'Views',
    comments: 'Comments'
}

export type SortablePost = {
    slug: string
    dateISO?: string
    initialViewCount?: number
    commentCount?: number
}

export function parseSort(field?: string | null, direction?: string | null): Sort {
    return {
        field: SORT_FIELDS.includes(field as SortField)
            ? (field as SortField)
            : DEFAULT_SORT.field,
        direction: direction === 'asc' ? 'asc' : DEFAULT_SORT.direction
    }
}

function timestamp(post: SortablePost): number {
    const time = new Date(post.dateISO ?? 0).getTime()
    return Number.isNaN(time) ? 0 : time
}

function sortValue(post: SortablePost, field: SortField): number {
    switch (field) {
        case 'views':
            return post.initialViewCount ?? 0
        case 'comments':
            return post.commentCount ?? 0
        case 'date':
            return timestamp(post)
    }
}

export function sortPosts<T extends SortablePost>(posts: T[], sort: Sort): T[] {
    const sign = sort.direction === 'asc' ? 1 : -1

    return [...posts].sort((a, b) => {
        const diff = sortValue(a, sort.field) - sortValue(b, sort.field)
        if (diff !== 0) return sign * diff

        // Ties fall back to newest first, then slug, so the order is stable
        const dateDiff = timestamp(b) - timestamp(a)
        return dateDiff !== 0 ? dateDiff : a.slug.localeCompare(b.slug)
    })
}
