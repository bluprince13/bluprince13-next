import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@mdx-js/mdx', () => ({
    runSync: vi.fn()
}))

vi.mock('@Modules/mdxComponents', () => ({
    mdxComponents: {}
}))

import { MdxRenderer } from '@Components/MdxRenderer'
import { runSync } from '@mdx-js/mdx'

const mockRunSync = vi.mocked(runSync)

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
