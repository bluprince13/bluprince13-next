import { fireEvent, render, screen } from '@testing-library/react'
import BlogIndex from '@Components/BlogIndex'

const { mockPush, mockGetAll } = vi.hoisted(() => ({
    mockPush: vi.fn(),
    mockGetAll: vi.fn().mockReturnValue([]),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => ({ getAll: mockGetAll }),
}))

vi.mock('@Components/PostCard', () => ({
    default: ({ title }: { title: string }) => <div>{title}</div>,
}))

const posts = [
    {
        slug: 'post-a',
        title: 'Post A',
        banner: '/a.jpg',
        dateFormatted: '1 Jan 2024',
        categories: ['react', 'typescript'],
        readingTime: 3,
        excerpt: 'Excerpt A',
    },
    {
        slug: 'post-b',
        title: 'Post B',
        banner: '/b.jpg',
        dateFormatted: '2 Jan 2024',
        categories: ['react'],
        readingTime: 5,
        excerpt: 'Excerpt B',
    },
    {
        slug: 'post-c',
        title: 'Post C',
        banner: '/c.jpg',
        dateFormatted: '3 Jan 2024',
        categories: ['typescript'],
        readingTime: 2,
        excerpt: 'Excerpt C',
    },
]

describe('BlogIndex', () => {
    beforeEach(() => {
        mockPush.mockClear()
        mockGetAll.mockReturnValue([])
    })

    it('shows total article count with no active tags', () => {
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('3 articles')).toBeInTheDocument()
    })

    it('renders all posts with no active tags', () => {
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('Post A')).toBeInTheDocument()
        expect(screen.getByText('Post B')).toBeInTheDocument()
        expect(screen.getByText('Post C')).toBeInTheDocument()
    })

    it('filters posts by a single active tag', () => {
        mockGetAll.mockReturnValue(['react'])
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('Post A')).toBeInTheDocument()
        expect(screen.getByText('Post B')).toBeInTheDocument()
        expect(screen.queryByText('Post C')).not.toBeInTheDocument()
    })

    it('filters posts by multiple active tags (AND logic)', () => {
        mockGetAll.mockReturnValue(['react', 'typescript'])
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('Post A')).toBeInTheDocument()
        expect(screen.queryByText('Post B')).not.toBeInTheDocument()
        expect(screen.queryByText('Post C')).not.toBeInTheDocument()
    })

    it('shows filtered count when tags are active', () => {
        mockGetAll.mockReturnValue(['react'])
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('2 of 3 articles')).toBeInTheDocument()
    })

    it('shows active tag chips in the header', () => {
        mockGetAll.mockReturnValue(['react', 'typescript'])
        render(<BlogIndex posts={posts} />)
        expect(screen.getByText('react')).toBeInTheDocument()
        expect(screen.getByText('typescript')).toBeInTheDocument()
    })

    it('does not show tag chips when no tags are active', () => {
        render(<BlogIndex posts={posts} />)
        expect(screen.queryByRole('button', { name: /react/i })).not.toBeInTheDocument()
    })

    it('deleting an active tag chip removes it from the URL', () => {
        mockGetAll.mockReturnValue(['react', 'typescript'])
        render(<BlogIndex posts={posts} />)
        const reactChip = screen.getByText('react').closest('[role="button"]')!
        fireEvent.click(reactChip.querySelector('[data-testid="CancelIcon"]')!)
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=typescript')
    })

    it('deleting the last active tag chip navigates to /blog', () => {
        mockGetAll.mockReturnValue(['react'])
        render(<BlogIndex posts={posts} />)
        const reactChip = screen.getByText('react').closest('[role="button"]')!
        fireEvent.click(reactChip.querySelector('[data-testid="CancelIcon"]')!)
        expect(mockPush).toHaveBeenCalledWith('/blog')
    })
})
