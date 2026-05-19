import { render, screen } from '@testing-library/react'
import Home from '@App/page'

describe('Home', () => {
    it('renders a heading', async () => {
        render(<Home />)

        expect(screen.getByText('Hello human')).toBeInTheDocument()
    })
})
