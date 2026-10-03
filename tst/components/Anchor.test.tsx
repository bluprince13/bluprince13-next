import Anchor from '@Components/Anchor'
import { render, screen } from '@testing-library/react'

describe('Anchor', () => {
    it('renders an ordinary link without a badge', () => {
        render(<Anchor href="https://wise.com">Wise</Anchor>)
        expect(screen.getByRole('link', { name: 'Wise' })).not.toHaveAttribute('rel')
        expect(screen.queryByText('referral')).not.toBeInTheDocument()
    })

    it('marks a referral link as sponsored and shows a badge after it', () => {
        render(<Anchor href="https://wise.com/invite/ihpc/vipina2" rel="noopener">Wise sign-up link</Anchor>)
        const link = screen.getByRole('link', { name: 'Wise sign-up link' })
        expect(link).toHaveAttribute('rel', 'noopener sponsored')
        expect(link).not.toContainElement(screen.getByText('referral'))
    })
})
