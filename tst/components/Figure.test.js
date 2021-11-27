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
        const { image } = setup()

        const caption = screen.getByText('caption')
        const reference = screen.getByText('[reference]')
        expect(caption.href).toBe('https://href.com/')
        expect(reference.href).toBe('https://reference-href.com/')
        expect(image.src).toBe('https://src.com/')
        expect(image).toHaveStyle('max-width: 350px')

        // TODO: Remove snapshot and test image width directly
        expect(image).toMatchSnapshot()
    })

    it('sets correct max-width for given size', () => {
        const { image: small } = setup({ size: 's' })
        expect(small).toHaveStyle('max-width: 200px')
        cleanup()

        const { image: medium } = setup({ size: 'm' })
        expect(medium).toHaveStyle('max-width: 350px')
        cleanup()

        const { image: large } = setup({ size: 'l' })
        expect(large).toHaveStyle('max-width:')
    })

    it('sets correct max-width for specified max-width', () => {
        const { image } = setup({ maxWidth: '13px' })

        expect(image).toHaveStyle('max-width: 13px')
    })
})
