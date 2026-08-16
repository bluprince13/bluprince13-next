import Table from '@Components/Table'
import { render, screen } from '@testing-library/react'
import { alpha, createTheme } from '@mui/material/styles'

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

    it('renders markdown in string cells', () => {
        render(
            <Table
                columns={[{ name: 'col1name', key: 'col1' }]}
                rows={[
                    {
                        col1: '- first item\n- second item with **bold**\n'
                    }
                ]}
            />
        )

        const items = screen.getAllByRole('listitem')
        expect(items).toHaveLength(2)
        expect(items[0]).toHaveTextContent('first item')
        expect(items[1].querySelector('strong')).toHaveTextContent('bold')
    })

    it('tints a row from its status without rendering it as a cell', () => {
        render(
            <Table
                columns={[{ name: 'col1name', key: 'col1' }]}
                rows={[{ col1: 'row1-col1', status: 'good' }]}
            />
        )

        const [, row] = screen.getAllByRole('row')
        const { palette } = createTheme()

        expect(row).toHaveStyle({
            backgroundColor: alpha(palette.success.main, 0.14)
        })
        // the styling prop must not leak onto the tr, nor become a column
        expect(row).not.toHaveAttribute('status')
        expect(row).toHaveTextContent(/^row1-col1$/)
    })

    it('tints an individual cell from its own status', () => {
        render(
            <Table
                columns={[
                    { name: 'col1name', key: 'col1' },
                    { name: 'col2name', key: 'col2' },
                    { name: 'col3name', key: 'col3' }
                ]}
                rows={[
                    {
                        col1: 'pinned',
                        col2: { content: 'tinted', status: 'bad' },
                        col3: 'plain'
                    }
                ]}
            />
        )

        const { palette } = createTheme()
        const [tinted, plain] = screen.getAllByRole('cell')

        expect(tinted).toHaveTextContent('tinted')
        expect(tinted).toHaveStyle({
            backgroundColor: alpha(palette.error.main, 0.14)
        })
        expect(plain).not.toHaveStyle({
            backgroundColor: alpha(palette.error.main, 0.14)
        })
    })

    it('layers a tint over the pinned first column rather than replacing it', () => {
        render(
            <Table
                columns={[
                    { name: 'col1name', key: 'col1' },
                    { name: 'col2name', key: 'col2' }
                ]}
                rows={[
                    {
                        col1: { content: 'tinted', status: 'bad' },
                        col2: 'plain'
                    }
                ]}
            />
        )

        const { palette } = createTheme()
        // the first column renders as a th, so it carries the rowheader role
        const pinned = screen.getByRole('rowheader')
        const tint = alpha(palette.error.main, 0.14)

        expect(pinned).toHaveStyle({ position: 'sticky', left: '0px' })

        // the opaque backdrop stops cells scrolling underneath from showing
        // through, so the tint and the zebra stripe ride on top of it as
        // background images. jest-dom cannot match backgroundColor and
        // backgroundImage together, hence reading the computed style directly
        const style = getComputedStyle(pinned)
        const stripe = palette.action.hover

        expect(style.backgroundColor).toBe('rgb(255, 255, 255)')
        expect(palette.background.paper).toBe('#fff')
        expect(style.backgroundImage).toBe(
            `linear-gradient(${tint}, ${tint}), linear-gradient(${stripe}, ${stripe})`
        )
    })

    it('widens the table beyond the article column so it scrolls sideways', () => {
        render(
            <Table
                columns={Array.from({ length: 9 }, (_, index) => ({
                    name: `col${index}name`,
                    key: `col${index}`
                }))}
                rows={[{ col0: 'only' }]}
            />
        )

        expect(screen.getByRole('table')).toHaveStyle({ minWidth: '1800px' })
    })

    it('renders markdown inside a tinted cell', () => {
        render(
            <Table
                columns={[{ name: 'col1name', key: 'col1' }]}
                rows={[
                    {
                        col1: {
                            content: '[1 year](https://example.com)',
                            status: 'good'
                        }
                    }
                ]}
            />
        )

        expect(screen.getByRole('link', { name: '1 year' })).toHaveAttribute(
            'href',
            'https://example.com'
        )
    })

    it('renders non-string cells as given', () => {
        render(
            <Table
                columns={[{ name: 'col1name', key: 'col1' }]}
                rows={[
                    { col1: <span data-testid="custom">not markdown</span> }
                ]}
            />
        )

        expect(screen.getByTestId('custom')).toHaveTextContent('not markdown')
    })
})
