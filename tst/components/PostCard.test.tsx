import { fireEvent, render, screen } from '@testing-library/react'
import PostCard from '@Components/PostCard'

const { mockPush, mockGetAll, mockGet } = vi.hoisted(() => ({
    mockPush: vi.fn(),
    mockGetAll: vi.fn().mockReturnValue([]),
    mockGet: vi.fn().mockReturnValue(null),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => ({ getAll: mockGetAll, get: mockGet }),
}))

vi.mock('@Components/blog/ViewCounter', () => ({
    ViewCount: ({ slug }: { slug: string }) => <span>{slug} views</span>,
}))

const defaultProps = {
    slug: 'my-post',
    title: 'My Test Post',
    banner: '/images/banner.jpg',
    dateFormatted: '1 January 2024',
    categories: ['tech', 'life'],
    readingTime: 5,
    excerpt: 'This is a short excerpt about the post.',
}

describe('PostCard', () => {
    beforeEach(() => {
        mockPush.mockClear()
        mockGetAll.mockReturnValue([])
        mockGet.mockReset()
        mockGet.mockReturnValue(null)
    })

    it('renders the post title', () => {
        render(<PostCard {...defaultProps} />)
        expect(screen.getByText('My Test Post')).toBeInTheDocument()
    })

    it('renders the excerpt', () => {
        render(<PostCard {...defaultProps} />)
        expect(screen.getByText('This is a short excerpt about the post.')).toBeInTheDocument()
    })

    it('renders date and reading time', () => {
        render(<PostCard {...defaultProps} />)
        expect(screen.getByText('1 January 2024 · 5 min read')).toBeInTheDocument()
    })

    it('renders all category chips', () => {
        render(<PostCard {...defaultProps} />)
        expect(screen.getByText('tech')).toBeInTheDocument()
        expect(screen.getByText('life')).toBeInTheDocument()
    })

    it('links to the correct /blog/[slug] path', () => {
        render(<PostCard {...defaultProps} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/blog/my-post')
    })

    it('clicking an inactive tag chip adds it to the URL', () => {
        render(<PostCard {...defaultProps} />)
        fireEvent.click(screen.getByText('tech'))
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=tech')
    })

    it('clicking an active tag chip removes it from the URL', () => {
        mockGetAll.mockReturnValue(['tech', 'life'])
        render(<PostCard {...defaultProps} />)
        fireEvent.click(screen.getByText('tech'))
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=life')
    })

    it('clicking the last active tag chip navigates to /blog', () => {
        mockGetAll.mockReturnValue(['tech'])
        render(<PostCard {...defaultProps} />)
        fireEvent.click(screen.getByText('tech'))
        expect(mockPush).toHaveBeenCalledWith('/blog')
    })

    it('renders the comment count from server data', () => {
        render(<PostCard {...defaultProps} commentCount={101} />)
        expect(screen.getByText('101 comments')).toBeInTheDocument()
    })

    it('renders a zero comment count when none is supplied', () => {
        render(<PostCard {...defaultProps} />)
        expect(screen.getByText('0 comments')).toBeInTheDocument()
    })

    it('renders the singular form for one comment', () => {
        render(<PostCard {...defaultProps} commentCount={1} />)
        expect(screen.getByText('1 comment')).toBeInTheDocument()
    })

    it('clicking a tag chip keeps the active sort', () => {
        mockGet.mockImplementation(key =>
            key === 'sort' ? 'comments' : key === 'dir' ? 'asc' : null
        )
        render(<PostCard {...defaultProps} />)
        fireEvent.click(screen.getByText('tech'))
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=tech&sort=comments&dir=asc')
    })
})
