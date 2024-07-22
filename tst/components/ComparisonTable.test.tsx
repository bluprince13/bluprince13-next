import { render } from '@testing-library/react'
import { ComparisonTable } from '@Components/ComparisonTable'

jest.mock('react-markdown', () => {
    return ({ children }) => {
        return children
    }
})

describe('ComparisonTable', () => {
    const setup = ({} = {}) => {
        const queries = render(
            <ComparisonTable
                columnHeaders={[
                    {
                        name: 'Feature A',
                        description: 'Description for Feature A'
                    },
                    {
                        name: 'Feature B',
                        description: 'Description for Feature B'
                    },
                    {
                        name: 'Feature C',
                        description: 'Description for Feature C'
                    }
                ]}
                rowHeaders={[
                    {
                        name: 'Option 1',
                        description: 'Description for Option 1'
                    },
                    {
                        name: 'Option 2',
                        description: 'Description for Option 2'
                    },
                    {
                        name: 'Option 3',
                        description: `A very long descripition that needs more than one line`
                    }
                ]}
                rows={[
                    [
                        {
                            content: 'Good',
                            status: 'good'
                        },
                        {
                            content: 'Average',
                            status: 'neutral'
                        },
                        {
                            content: 'Poor',
                            status: 'bad'
                        }
                    ],
                    [
                        {
                            content: 'Poor',
                            status: 'bad'
                        },
                        {
                            content: 'Good',
                            status: 'good'
                        },
                        {
                            content: 'Average',
                            status: 'neutral'
                        }
                    ],
                    [
                        {
                            content: 'Average',
                            status: 'neutral'
                        },
                        {
                            content: 'Poor',
                            status: 'bad'
                        },
                        {
                            content:
                                'Very long content that needs more than one line',
                            status: 'good'
                        }
                    ]
                ]}
                summary="summary"
            />
        )
        return queries
    }

    it('renders correctly', () => {
        setup()

        const { asFragment } = setup()

        expect(asFragment()).toMatchSnapshot()
    })
})
