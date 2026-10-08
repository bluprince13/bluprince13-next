import { render } from '@testing-library/react'
import Youtube from '@Components/Youtube'

describe('Youtube', () => {
    it('embeds a single video by id', () => {
        const { container } = render(<Youtube id="abc123" />)
        expect(container.querySelector('iframe')).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123')
    })

    it('embeds a playlist', () => {
        const { container } = render(<Youtube playlist="PL123" />)
        expect(container.querySelector('iframe')).toHaveAttribute(
            'src',
            'https://www.youtube.com/embed/videoseries?list=PL123'
        )
    })
})
