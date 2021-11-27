import Timeline from '@Components/Timeline'
import { render } from '@testing-library/react'

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

    it('renders correctly', () => {
        const { asFragment } = setup()

        expect(asFragment()).toMatchSnapshot()
    })
})
