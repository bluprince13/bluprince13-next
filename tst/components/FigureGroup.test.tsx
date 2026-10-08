import Figure from '@Components/Figure'
import FigureGroup from '@Components/FigureGroup'
import { render, screen } from '@testing-library/react'

describe('FigureGroup', () => {
    it('renders each figure with its own caption', () => {
        render(
            <FigureGroup>
                <Figure src="/a.png" caption="First" />
                <Figure src="/b.png" caption="Second" />
            </FigureGroup>
        )
        const figures = screen.getAllByRole('figure')
        expect(figures).toHaveLength(2)
        expect(figures[0].parentElement).toBe(figures[1].parentElement)
        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
    })
})
