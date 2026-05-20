import { render, screen } from '@testing-library/react'
import { RelatedPosts } from '@Components/blog/RelatedPosts'
import { getRelatedPosts } from '@Modules/posts'
import type { PostData } from '@Modules/posts'

const makePost = (overrides: Partial<PostData> = {}): PostData => ({
    slug: 'test-slug',
    title: 'Test Post',
    dateFormatted: '1 January 2024',
    dateISO: '2024-01-01',
    banner: '/images/test-banner.jpg',
    href: '/blog/test-slug',
    description: 'A test post',
    bannerFullUrl: 'https://example.com/images/test-banner.jpg',
    categories: ['tech'],
    readingTime: 3,
    excerpt: 'A short excerpt about the test post.',
    ...overrides
})

describe('getRelatedPosts', () => {
    const current = makePost({ slug: 'current', categories: ['tech', 'react'] })

    it('excludes the current post from results', () => {
        const all = [current, makePost({ slug: 'other', categories: ['tech'] })]
        const result = getRelatedPosts(current, all)
        expect(result.every(p => p.slug !== 'current')).toBe(true)
    })

    it('ranks posts with more shared categories higher', () => {
        const one = makePost({ slug: 'one', categories: ['tech'] })
        const two = makePost({ slug: 'two', categories: ['tech', 'react'] })
        const result = getRelatedPosts(current, [current, one, two])
        expect(result[0].slug).toBe('two')
    })

    it('breaks score ties by most recent date', () => {
        const older = makePost({ slug: 'older', dateISO: '2023-01-01', categories: ['tech'] })
        const newer = makePost({ slug: 'newer', dateISO: '2024-06-01', categories: ['tech'] })
        const result = getRelatedPosts(current, [current, older, newer])
        expect(result[0].slug).toBe('newer')
    })

    it('returns at most 3 posts', () => {
        const all = [
            current,
            makePost({ slug: 'a', categories: ['tech'] }),
            makePost({ slug: 'b', categories: ['tech'] }),
            makePost({ slug: 'c', categories: ['tech'] }),
            makePost({ slug: 'd', categories: ['tech'] }),
        ]
        expect(getRelatedPosts(current, all)).toHaveLength(3)
    })

    it('falls back to 3 most recent posts when no categories match', () => {
        const all = [
            current,
            makePost({ slug: 'a', dateISO: '2024-01-01', categories: ['cooking'] }),
            makePost({ slug: 'b', dateISO: '2024-02-01', categories: ['cooking'] }),
            makePost({ slug: 'c', dateISO: '2024-03-01', categories: ['cooking'] }),
            makePost({ slug: 'd', dateISO: '2024-04-01', categories: ['cooking'] }),
        ]
        const result = getRelatedPosts(current, all)
        expect(result).toHaveLength(3)
        expect(result.map(p => p.slug)).toEqual(['a', 'b', 'c'])
    })

    it('returns empty array when no other posts exist', () => {
        expect(getRelatedPosts(current, [current])).toEqual([])
    })
})

describe('RelatedPosts', () => {
    it('renders nothing when posts is empty', () => {
        const { container } = render(<RelatedPosts posts={[]} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders the correct number of cards', () => {
        const posts = [
            makePost({ slug: 'post-1', title: 'Post One' }),
            makePost({ slug: 'post-2', title: 'Post Two' }),
            makePost({ slug: 'post-3', title: 'Post Three' })
        ]
        render(<RelatedPosts posts={posts} />)
        expect(screen.getByText('Post One')).toBeInTheDocument()
        expect(screen.getByText('Post Two')).toBeInTheDocument()
        expect(screen.getByText('Post Three')).toBeInTheDocument()
    })

    it('each card links to the correct /blog/[slug] path', () => {
        const posts = [
            makePost({ slug: 'first-post', title: 'First Post' }),
            makePost({ slug: 'second-post', title: 'Second Post' })
        ]
        render(<RelatedPosts posts={posts} />)
        const links = screen.getAllByRole('link')
        const hrefs = links.map(l => l.getAttribute('href'))
        expect(hrefs).toContain('/blog/first-post')
        expect(hrefs).toContain('/blog/second-post')
    })
})
