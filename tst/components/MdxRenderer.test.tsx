import { render, screen } from '@testing-library/react'

jest.mock('@mdx-js/mdx', () => ({
    runSync: jest.fn()
}))

jest.mock('@Modules/mdxComponents', () => ({
    mdxComponents: {}
}))

import { MdxRenderer } from '@Components/MdxRenderer'
import { runSync } from '@mdx-js/mdx'

const mockRunSync = runSync as jest.Mock

describe('MdxRenderer', () => {
    it('renders text content from compiled MDX', () => {
        const MockContent = () => <p>Hello from MDX</p>
        mockRunSync.mockReturnValue({ default: MockContent })

        render(<MdxRenderer compiledSource="some compiled source" />)
        screen.getByText('Hello from MDX')
    })

    it('does not crash on empty compiledSource string', () => {
        mockRunSync.mockImplementation(() => {
            throw new Error('runSync error')
        })

        const { container } = render(<MdxRenderer compiledSource="" />)
        expect(container.firstChild).toBeNull()
    })
})
