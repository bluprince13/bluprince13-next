import Table from '@Components/Table'
import { render } from '@testing-library/react'

const columns = [
    { name: 'col1name', key: 'col1' },
    { name: 'col2name', key: 'col2' }
]

const rows = [
    {
        col1: 'row1-col1',
        col2: 'row1-col2'
    },
    {
        col1: 'row2-col1',
        col2: 'row2-col2'
    }
]

describe('Table', () => {
    const setup = () => {
        const queries = render(<Table rows={rows} columns={columns} />)
        return queries
    }

    it('renders correctly', () => {
        const { asFragment } = setup()

        expect(asFragment()).toMatchSnapshot()
    })
})
