import Alert from '@Components/Alert'
import { render, screen } from '@testing-library/react'

describe('Alert', () => {
    const setup = ({} = {}) => {
        const queries = render(
            <Alert severity="warning">This is a warning!</Alert>
        )
        return queries
    }

    it('renders correctly', () => {
        setup()

        screen.getByText('This is a warning!')
    })
})
