import { DEFAULT_SORT, parseSort, sortPosts } from '@Modules/blogSort'

const posts = [
    { slug: 'b', dateISO: '2024-01-02', initialViewCount: 50, commentCount: 3 },
    { slug: 'a', dateISO: '2024-01-03', initialViewCount: 10, commentCount: 9 },
    { slug: 'c', dateISO: '2024-01-01', initialViewCount: 90, commentCount: 0 },
]

const slugs = (sorted: { slug: string }[]) => sorted.map(p => p.slug)

describe('parseSort', () => {
    it('falls back to the default sort for missing params', () => {
        expect(parseSort(null, null)).toEqual(DEFAULT_SORT)
    })

    it('falls back to the default field for an unknown field', () => {
        expect(parseSort('bogus', 'asc')).toEqual({ field: 'date', direction: 'asc' })
    })

    it('reads a valid field and direction', () => {
        expect(parseSort('views', 'asc')).toEqual({ field: 'views', direction: 'asc' })
    })

    it('treats any direction other than asc as desc', () => {
        expect(parseSort('comments', 'sideways')).toEqual({ field: 'comments', direction: 'desc' })
    })
})

describe('sortPosts', () => {
    it('sorts by date descending — newest first', () => {
        expect(slugs(sortPosts(posts, { field: 'date', direction: 'desc' }))).toEqual(['a', 'b', 'c'])
    })

    it('sorts by date ascending — oldest first', () => {
        expect(slugs(sortPosts(posts, { field: 'date', direction: 'asc' }))).toEqual(['c', 'b', 'a'])
    })

    it('sorts by views in both directions', () => {
        expect(slugs(sortPosts(posts, { field: 'views', direction: 'desc' }))).toEqual(['c', 'b', 'a'])
        expect(slugs(sortPosts(posts, { field: 'views', direction: 'asc' }))).toEqual(['a', 'b', 'c'])
    })

    it('sorts by comments in both directions', () => {
        expect(slugs(sortPosts(posts, { field: 'comments', direction: 'desc' }))).toEqual(['a', 'b', 'c'])
        expect(slugs(sortPosts(posts, { field: 'comments', direction: 'asc' }))).toEqual(['c', 'b', 'a'])
    })

    it('treats missing counts as zero', () => {
        const withMissing = [
            { slug: 'none', dateISO: '2024-01-01' },
            { slug: 'some', dateISO: '2024-01-02', initialViewCount: 5 },
        ]
        expect(slugs(sortPosts(withMissing, { field: 'views', direction: 'desc' }))).toEqual([
            'some',
            'none',
        ])
    })

    it('breaks ties by newest first', () => {
        const tied = [
            { slug: 'older', dateISO: '2024-01-01', commentCount: 2 },
            { slug: 'newer', dateISO: '2024-02-01', commentCount: 2 },
        ]
        expect(slugs(sortPosts(tied, { field: 'comments', direction: 'asc' }))).toEqual([
            'newer',
            'older',
        ])
    })

    it('breaks same-date ties by slug', () => {
        const tied = [
            { slug: 'zebra', dateISO: '2024-01-01', commentCount: 1 },
            { slug: 'apple', dateISO: '2024-01-01', commentCount: 1 },
        ]
        expect(slugs(sortPosts(tied, { field: 'comments', direction: 'desc' }))).toEqual([
            'apple',
            'zebra',
        ])
    })

    it('does not mutate the input array', () => {
        const input = [...posts]
        sortPosts(input, { field: 'views', direction: 'asc' })
        expect(slugs(input)).toEqual(['b', 'a', 'c'])
    })
})
