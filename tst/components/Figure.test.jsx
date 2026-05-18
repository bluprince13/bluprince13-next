import Figure from '@Components/Figure'
import { cleanup, render, screen } from '@testing-library/react'

describe('Figure', () => {
    const setup = ({ size = 'm', maxWidth } = {}) => {
        const queries = render(
            <Figure
                src="https://src.com"
                alt="alt"
                caption="caption"
                href="https://href.com"
                reference="reference"
                referenceHref="https://reference-href.com"
                maxWidth={maxWidth}
                size={size}
            />
        )
        const image = screen.getByAltText('alt')

        return { image, ...queries }
    }

    it('renders correctly', () => {
        const { asFragment, image } = setup()

        const caption = screen.getByRole('link', { name: 'caption' })
        const reference = screen.getByRole('link', { name: 'reference' })
        expect(caption).toHaveAttribute('href', 'https://href.com')
        expect(reference).toHaveAttribute('href', 'https://reference-href.com')
        expect(image.src).toBe('https://src.com/')
        expect(image).toHaveStyle('max-width: 350px')
        expect(asFragment()).toMatchSnapshot()
    })

    it('sets correct max-width for given size', () => {
        const { image: small } = setup({ size: 's' })
        expect(small).toHaveStyle('max-width: 200px')
        cleanup()

        const { image: medium } = setup({ size: 'm' })
        expect(medium).toHaveStyle('max-width: 350px')
        cleanup()

        const { image: large } = setup({ size: 'l' })
        expect(large.style.maxWidth).toBeFalsy()
    })

    it('sets correct max-width for specified max-width', () => {
        const { image } = setup({ maxWidth: '13px' })

        expect(image).toHaveStyle('max-width: 13px')
    })
})
