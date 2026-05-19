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

        expect(screen.getByText('This is a warning!')).toBeInTheDocument()
    })
})
