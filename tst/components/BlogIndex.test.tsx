import { fireEvent, render, screen, within } from '@testing-library/react'
import BlogIndex from '@Components/BlogIndex'

const { mockPush, mockGetAll, mockGet } = vi.hoisted(() => ({
    mockPush: vi.fn(),
    mockGetAll: vi.fn().mockReturnValue([]),
    mockGet: vi.fn().mockReturnValue(null),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => ({ getAll: mockGetAll, get: mockGet }),
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
        dateISO: '2024-01-01',
        categories: ['react', 'typescript'],
        readingTime: 3,
        excerpt: 'Excerpt A',
        initialViewCount: 30,
        commentCount: 1,
    },
    {
        slug: 'post-b',
        title: 'Post B',
        banner: '/b.jpg',
        dateFormatted: '2 Jan 2024',
        dateISO: '2024-01-02',
        categories: ['react'],
        readingTime: 5,
        excerpt: 'Excerpt B',
        initialViewCount: 10,
        commentCount: 7,
    },
    {
        slug: 'post-c',
        title: 'Post C',
        banner: '/c.jpg',
        dateFormatted: '3 Jan 2024',
        dateISO: '2024-01-03',
        categories: ['typescript'],
        readingTime: 2,
        excerpt: 'Excerpt C',
        initialViewCount: 20,
        commentCount: 4,
    },
]

/** Mocks `?sort=`/`?dir=`; anything else reads as absent. */
function mockSortParams(sort: string | null, dir: string | null = null) {
    mockGet.mockImplementation(key => (key === 'sort' ? sort : key === 'dir' ? dir : null))
}

const renderedTitles = () =>
    posts
        .map(p => ({ title: p.title, node: screen.queryByText(p.title) }))
        .filter(p => p.node)
        .sort((a, b) =>
            a.node!.compareDocumentPosition(b.node!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        )
        .map(p => p.title)

describe('BlogIndex', () => {
    beforeEach(() => {
        mockPush.mockClear()
        mockGetAll.mockReturnValue([])
        mockGet.mockReset()
        mockGet.mockReturnValue(null)
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

    it('deleting a tag chip keeps the active sort', () => {
        mockGetAll.mockReturnValue(['react', 'typescript'])
        mockSortParams('views', 'asc')
        render(<BlogIndex posts={posts} />)
        const reactChip = screen.getByText('react').closest('[role="button"]')!
        fireEvent.click(reactChip.querySelector('[data-testid="CancelIcon"]')!)
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=typescript&sort=views&dir=asc')
    })

    it('sorts by date descending by default', () => {
        render(<BlogIndex posts={posts} />)
        expect(renderedTitles()).toEqual(['Post C', 'Post B', 'Post A'])
    })

    it('sorts by views when the URL asks for it', () => {
        mockSortParams('views')
        render(<BlogIndex posts={posts} />)
        expect(renderedTitles()).toEqual(['Post A', 'Post C', 'Post B'])
    })

    it('sorts by comments ascending when the URL asks for it', () => {
        mockSortParams('comments', 'asc')
        render(<BlogIndex posts={posts} />)
        expect(renderedTitles()).toEqual(['Post A', 'Post C', 'Post B'])
    })

    it('labels the sort button with the active field and direction', () => {
        mockSortParams('comments', 'asc')
        render(<BlogIndex posts={posts} />)
        expect(
            screen.getByRole('button', { name: 'Sort by Comments, ascending' })
        ).toBeInTheDocument()
    })

    it('picking a new sort field puts it in the URL', () => {
        render(<BlogIndex posts={posts} />)
        fireEvent.click(screen.getByRole('button', { name: /^Sort by/ }))
        fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Sort by Views' }))
        expect(mockPush).toHaveBeenCalledWith('/blog?sort=views')
    })

    it('picking the active sort field flips the direction', () => {
        mockSortParams('views')
        render(<BlogIndex posts={posts} />)
        fireEvent.click(screen.getByRole('button', { name: /^Sort by/ }))
        fireEvent.click(
            within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Sort by Views, descending' })
        )
        expect(mockPush).toHaveBeenCalledWith('/blog?sort=views&dir=asc')
    })

    it('keeps active tags when the sort changes', () => {
        mockGetAll.mockReturnValue(['react'])
        render(<BlogIndex posts={posts} />)
        fireEvent.click(screen.getByRole('button', { name: /^Sort by/ }))
        fireEvent.click(
            within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Sort by Comments' })
        )
        expect(mockPush).toHaveBeenCalledWith('/blog?tag=react&sort=comments')
    })
})
