import Timeline from '@Components/Timeline'
import { render } from '@testing-library/react'
import { vi } from 'vitest'

let mockIsMobile = false
vi.mock('@mui/material/useMediaQuery', () => ({ default: () => mockIsMobile }))
vi.mock('@Components/MaterialIcon', () => ({
    default: ({ name }) => <span data-testid={`icon-${name}`} />,
}))

describe('Timeline', () => {
    const setup = () => {
        const queries = render(
            <Timeline
                items={[
                    {
                        marker: 'marker1',
                        title: 'With description',
                        description: 'description1',
                        iconName: 'start',
                        color: 'info'
                    },
                    {
                        marker: 'marker2',
                        title: 'Without description',
                        iconName: 'end',
                        color: 'error'
                    }
                ]}
            />
        )
        return queries
    }

    it('renders as an alternating Timeline', () => {
        const { asFragment } = setup()

        expect(asFragment()).toMatchSnapshot()
    })

    it('renders as a left alignged Timeline on mobile', () => {
        mockIsMobile = true
        const { asFragment } = setup()

        expect(asFragment()).toMatchSnapshot()

        mockIsMobile = false
    })

    it('renders phase dividers between items', () => {
        const { getByText, getAllByRole } = render(
            <Timeline
                items={[
                    { phase: 'First trimester', subtitle: 'Weeks 1-12' },
                    { marker: 'marker1', title: 'Item', description: 'description1', iconName: 'start' }
                ]}
            />
        )

        expect(getByText('First trimester')).toBeInTheDocument()
        expect(getByText(/Weeks 1-12/)).toBeInTheDocument()
        expect(getAllByRole('listitem')).toHaveLength(2)
    })

    it('renders markdown in descriptions', () => {
        const { getByRole } = render(
            <Timeline
                items={[
                    {
                        marker: 'marker1',
                        title: 'Item',
                        description: 'Take [folic acid](https://www.nhs.uk/medicines/folic-acid/) daily.',
                        iconName: 'start'
                    }
                ]}
            />
        )

        expect(getByRole('link', { name: 'folic acid' })).toHaveAttribute('href', 'https://www.nhs.uk/medicines/folic-acid/')
    })

    it('links the title when an href is given', () => {
        const { getByRole } = render(
            <Timeline items={[{ marker: 'marker1', title: 'Plan ahead', href: '#plan-ahead', iconName: 'start' }]} />
        )

        expect(getByRole('link', { name: 'Plan ahead' })).toHaveAttribute('href', '#plan-ahead')
    })
})
