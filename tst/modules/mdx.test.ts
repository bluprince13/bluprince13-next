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
