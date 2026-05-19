import Figure from '@Components/Figure'
import { cleanup, render, screen } from '@testing-library/react'

describe('Figure', () => {
    const defaultProps = {
        src: '/test.png',
        alt: 'alt',
        caption: 'caption',
        href: 'https://href.com',
        reference: 'reference',
        referenceHref: 'https://reference-href.com',
    }

    const setup = (props: Partial<typeof defaultProps> & { size?: string; maxWidth?: string; align?: 'center' } = {}) => {
        const queries = render(<Figure {...defaultProps} {...props} />)
        return queries
    }

    it('renders image with correct src and alt', () => {
        setup()
        const image = screen.getByAltText('alt')
        expect(image.getAttribute('src')).toContain('test.png')
    })

    it('falls back to caption as alt when alt is omitted', () => {
        const { alt: _alt, ...propsWithoutAlt } = defaultProps
        render(<Figure {...propsWithoutAlt} />)
        expect(screen.getByAltText('caption')).toBeInTheDocument()
    })

    it('renders caption as a link when href is provided', () => {
        setup()
        const caption = screen.getByRole('link', { name: 'caption' })
        expect(caption).toHaveAttribute('href', 'https://href.com')
    })

    it('renders caption as plain text when href is omitted', () => {
        const { href: _href, ...propsWithoutHref } = defaultProps
        render(<Figure {...propsWithoutHref} />)
        expect(screen.getByText('caption')).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'caption' })).not.toBeInTheDocument()
    })

    it('renders reference link with correct href', () => {
        setup()
        const reference = screen.getByRole('link', { name: 'reference' })
        expect(reference).toHaveAttribute('href', 'https://reference-href.com')
    })

    it('defaults reference href to # when referenceHref is omitted', () => {
        const { referenceHref: _ref, ...props } = defaultProps
        render(<Figure {...props} />)
        expect(screen.getByRole('link', { name: 'reference' })).toHaveAttribute('href', '#')
    })

    it('omits reference when reference prop is not provided', () => {
        const { reference: _ref, referenceHref: _refHref, ...props } = defaultProps
        render(<Figure {...props} />)
        expect(screen.queryByRole('link', { name: 'reference' })).not.toBeInTheDocument()
    })

    it('omits figcaption when caption is not provided', () => {
        const { caption: _caption, ...props } = defaultProps
        render(<Figure {...props} />)
        expect(screen.queryByRole('figure')).not.toBeNull()
        expect(document.querySelector('figcaption')).not.toBeInTheDocument()
    })

    describe('size max-width', () => {
        it.each([
            ['xs', '75px'],
            ['s', '200px'],
            ['m', '350px'],
            ['ml', '500px'],
        ])('size="%s" applies max-width %s', (size, expectedMaxWidth) => {
            setup({ size: size as any })
            const image = screen.getByAltText('alt')
            expect(image).toHaveStyle(`max-width: ${expectedMaxWidth}`)
            cleanup()
        })

        it('size="l" applies no max-width', () => {
            setup({ size: 'l' as any })
            const image = screen.getByAltText('alt')
            expect(image.style.maxWidth).toBeFalsy()
        })

        it('explicit maxWidth overrides size', () => {
            setup({ maxWidth: '13px' })
            expect(screen.getByAltText('alt')).toHaveStyle('max-width: 13px')
        })
    })

    it('align="center" applies margin auto and display block', () => {
        setup({ align: 'center' })
        const image = screen.getByAltText('alt')
        expect(image).toHaveStyle('margin: auto')
        expect(image).toHaveStyle('display: block')
    })

    it('renders correctly', () => {
        const { asFragment } = setup()
        expect(asFragment()).toMatchSnapshot()
    })
})
