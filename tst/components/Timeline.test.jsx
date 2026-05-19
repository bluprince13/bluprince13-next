import Timeline from '@Components/Timeline'
import { render } from '@testing-library/react'
import { vi } from 'vitest'

let mockIsMobile = false
vi.mock('@mui/material/useMediaQuery', () => ({ default: () => mockIsMobile }))

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
})
