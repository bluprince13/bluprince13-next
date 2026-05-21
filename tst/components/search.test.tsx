import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchModal from '@Components/appbar/SearchModal'

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
}))

const mocks = vi.hoisted(() => ({
    search: vi.fn().mockResolvedValue({ results: [] }),
}))

vi.mock('@Modules/pagefind', () => ({
    getAllTags: () => ['immigration', 'uk', 'software'],
    getPagefind: vi.fn().mockResolvedValue({ search: mocks.search }),
}))

function setup(open = true) {
    const onClose = vi.fn()
    const utils = render(<SearchModal open={open} onClose={onClose} />)
    const input = () => screen.getByRole('textbox')
    const type = (value: string) => fireEvent.change(input(), { target: { value } })
    return { ...utils, onClose, input, type }
}

beforeEach(() => mocks.search.mockClear())

describe('SearchModal — idle state', () => {
    it('shows idle footer hint with no query or tags', () => {
        setup()
        expect(screen.getByText('type to search · # to filter by tag')).toBeInTheDocument()
    })

    it('shows empty search prompt', async () => {
        setup()
        await waitFor(() => expect(screen.getByText('Start typing to search')).toBeInTheDocument())
    })
})

describe('SearchModal — tag mode', () => {
    it('enters tag mode when # is typed at the start', async () => {
        const { type } = setup()
        type('#')
        await waitFor(() => expect(screen.getByText('immigration')).toBeInTheDocument())
    })

    it('enters tag mode when # is appended after existing text', async () => {
        const { type } = setup()
        type('guide#')
        await waitFor(() => expect(screen.getByText('immigration')).toBeInTheDocument())
    })

    it('filters tags by substring after #', async () => {
        const { type } = setup()
        type('#uk')
        await waitFor(() => {
            expect(screen.getByText('uk')).toBeInTheDocument()
            expect(screen.queryByText('immigration')).not.toBeInTheDocument()
            expect(screen.queryByText('software')).not.toBeInTheDocument()
        })
    })

    it('shows "No tags match" when no tags match the search', async () => {
        const { type } = setup()
        type('#zzz')
        await waitFor(() => expect(screen.getByText('No tags match')).toBeInTheDocument())
    })

    it('does not call pagefind search while in tag mode', async () => {
        const { type } = setup()
        type('#uk')
        await waitFor(() => screen.getByText('uk'))
        expect(mocks.search).not.toHaveBeenCalled()
    })
})

describe('SearchModal — adding tags', () => {
    it('adds a chip when a tag is clicked', async () => {
        const { type } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        expect(screen.getByText('uk', { selector: '.MuiChip-label' })).toBeInTheDocument()
    })

    it('clears the # suffix and keeps text before it when a tag is selected', async () => {
        const { type, input } = setup()
        type('guide#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        expect(input()).toHaveValue('guide')
    })

    it('clears query entirely when # was at the start', async () => {
        const { type, input } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        expect(input()).toHaveValue('')
    })

    it('excludes already-selected tags from the picker', async () => {
        const { type } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        // Open tag picker again
        type('#')
        await waitFor(() => screen.getByText('immigration'))
        // 'uk' appears only as the chip label, not in the picker list
        expect(screen.getAllByText('uk')).toHaveLength(1)
    })

    it('selects a tag via keyboard Enter', async () => {
        const { type, input } = setup()
        type('#')
        await waitFor(() => screen.getByText('immigration'))
        fireEvent.keyDown(input(), { key: 'Enter' })
        expect(screen.getByText('immigration', { selector: '.MuiChip-label' })).toBeInTheDocument()
    })

    it('navigates tag list with arrow keys before selecting', async () => {
        const { type, input } = setup()
        type('#')
        await waitFor(() => screen.getByText('immigration'))
        fireEvent.keyDown(input(), { key: 'ArrowDown' }) // move to uk (index 1)
        fireEvent.keyDown(input(), { key: 'Enter' })
        expect(screen.getByText('uk', { selector: '.MuiChip-label' })).toBeInTheDocument()
    })
})

describe('SearchModal — removing tags', () => {
    it('removes a tag chip when its delete icon is clicked', async () => {
        const { type } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        fireEvent.click(screen.getByTestId('CancelIcon'))
        expect(screen.queryByText('uk', { selector: '.MuiChip-label' })).not.toBeInTheDocument()
    })

    it('reverts placeholder to default after all tags removed', async () => {
        const { type } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        expect(screen.getByPlaceholderText('Filter within tags…')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('CancelIcon'))
        expect(screen.getByPlaceholderText('Search posts…')).toBeInTheDocument()
    })
})

describe('SearchModal — footer hints', () => {
    it('shows navigate hint when search results are visible', async () => {
        mocks.search.mockResolvedValueOnce({
            results: [{
                data: () => Promise.resolve({
                    url: '/blog/post',
                    meta: { title: 'Test Post' },
                    excerpt: 'An excerpt.',
                    filters: { category: ['uk'] },
                }),
            }],
        })
        const { type } = setup()
        type('test')
        await waitFor(() => {
            expect(screen.getByText('↑↓ navigate · ↵ open · # to add tag')).toBeInTheDocument()
        })
    })

    it('shows navigate hint when a tag is active with no text query', async () => {
        mocks.search.mockResolvedValue({
            results: [{
                data: () => Promise.resolve({
                    url: '/blog/post',
                    meta: { title: 'Test Post' },
                    excerpt: 'An excerpt.',
                    filters: { category: ['uk'] },
                }),
            }],
        })
        const { type } = setup()
        type('#')
        await waitFor(() => screen.getByText('uk'))
        fireEvent.click(screen.getByText('uk'))
        await waitFor(() => {
            expect(screen.getByText('↑↓ navigate · ↵ open · # to add tag')).toBeInTheDocument()
        })
    })
})
