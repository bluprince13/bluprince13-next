import { render, screen } from '@testing-library/react'
import SlideCard from '@Components/SlideCard'

const defaultProps = {
    slug: 'intro-to-nextjs',
    title: 'Introduction to Next.js',
    description: 'A talk about Next.js fundamentals',
    author: 'Vipin Ajayakumar',
    banner: null,
    date: '2021-02-04',
}

describe('SlideCard', () => {
    it('renders the deck title', () => {
        render(<SlideCard {...defaultProps} />)
        expect(screen.getByText('Introduction to Next.js')).toBeInTheDocument()
    })

    it('renders the description', () => {
        render(<SlideCard {...defaultProps} />)
        expect(screen.getByText('A talk about Next.js fundamentals')).toBeInTheDocument()
    })

    it('hides the description when it just repeats the title', () => {
        render(<SlideCard {...defaultProps} description="Introduction to Next.js" />)
        expect(screen.getAllByText('Introduction to Next.js')).toHaveLength(1)
    })

    it('renders the formatted date', () => {
        render(<SlideCard {...defaultProps} />)
        expect(screen.getByText('4 Feb 2021')).toBeInTheDocument()
    })

    it('links to the deck with a trailing slash', () => {
        render(<SlideCard {...defaultProps} />)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/slides/intro-to-nextjs/')
    })

    it('renders the banner image when provided', () => {
        render(<SlideCard {...defaultProps} banner="/slides/intro-to-nextjs/banner.png" />)
        expect(screen.getByRole('img')).toHaveAttribute('src', '/slides/intro-to-nextjs/banner.png')
    })
})
