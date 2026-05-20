import { render, screen } from '@testing-library/react'
import PostCard from '@Components/PostCard'

vi.mock('@Components/blog/ViewCounter', () => ({
    ViewCount: ({ slug }: { slug: string }) => <span>{slug} views</span>,
}))

vi.mock('@Components/Comments', () => ({
    MyCommentCount: ({ id }: { id: string }) => <span>{id} comments</span>,
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
})
