import { vi } from 'vitest'

vi.mock('next/dynamic', () => ({ default: (fn: any) => fn() }))
vi.mock('@Components/ComparisonTable', () => ({
    ComparisonTable: () => null,
}))

import { mdxComponents } from '@Modules/mdxComponents'
import { Mermaid } from '@Components/Mermaid'

describe('mdxComponents', () => {
    it('registers Mermaid under both uppercase and lowercase keys', () => {
        expect(mdxComponents.Mermaid).toBe(Mermaid)
        expect(mdxComponents.mermaid).toBe(Mermaid)
    })

    it('includes all expected component keys', () => {
        const expectedKeys = [
            'Figure', 'Youtube', 'Timeline', 'Table', 'Alert',
            'ComparisonTable', 'Mermaid', 'mermaid', 'Iframe',
            'SymbolOverviewWidget', 'Typography', 'Link',
        ]
        for (const key of expectedKeys) {
            expect(mdxComponents).toHaveProperty(key)
        }
    })
})
