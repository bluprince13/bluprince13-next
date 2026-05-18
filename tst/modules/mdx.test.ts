jest.mock('@mdx-js/mdx', () => ({
    compile: jest.fn().mockResolvedValue({ toString: () => '/* compiled MDX output */' }),
    evaluate: jest.fn()
}))
jest.mock('remark-toc', () => jest.fn())
jest.mock('remark-emoji', () => jest.fn())
jest.mock('remark-codesandbox', () => jest.fn())
jest.mock('mdx-mermaid', () => jest.fn())
jest.mock('rehype-slug', () => jest.fn())
jest.mock('rehype-autolink-headings', () => jest.fn())
jest.mock('rehype-pretty-code', () => jest.fn())
jest.mock('rehype-citation', () => jest.fn())

import { compileMdx } from '@Modules/mdx'

describe('compileMdx', () => {
    it('compiles valid MDX string to a non-empty string output', async () => {
        const result = await compileMdx('# Hello World')
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)
    })

    it('does not throw on empty string input', async () => {
        await expect(compileMdx('')).resolves.not.toThrow()
    })
})
