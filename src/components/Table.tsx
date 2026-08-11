'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha, styled, type Theme } from '@mui/material/styles'
import Markdown from 'react-markdown'
import { isValidElement, useEffect, useRef, useState } from 'react'

interface Column {
    name: string
    key: string
}

type Status = 'good' | 'neutral' | 'bad'

type PaletteKey = 'success' | 'warning' | 'error'

const statusPalette: Record<Status, PaletteKey> = {
    good: 'success',
    neutral: 'warning',
    bad: 'error'
}

type TintedCell = { content: React.ReactNode; status: Status }

type Cell = React.ReactNode | TintedCell

// A row may carry its own status to tint the whole row; it is never rendered as
// a cell. Tinting cells individually suits tables where no single row is wholly
// good or bad
type Row = Record<string, Cell> & { status?: Status }

const isTintedCell = (cell: Cell): cell is TintedCell =>
    typeof cell === 'object' &&
    cell !== null &&
    !isValidElement(cell) &&
    'content' in cell

// Cell markdown is usually a fragment rather than prose, so strip the block
// margins that would otherwise pad every cell out
const markdownSx = {
    '& p': { m: 0 },
    '& p + p': { mt: 1 },
    '& ul, & ol': { m: 0, pl: '1.2em' },
    '& li + li': { mt: 0.5 }
}

// Roughly how much room a column needs before its cells wrap into slivers. Wide
// tables overflow the article column and scroll sideways
const COLUMN_WIDTH = 200

const MIN_TABLE_WIDTH = 650

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))

// theme.palette holds the light scheme's literal colours even in dark mode, so
// anything that follows the colour scheme reads from the CSS variable. Tests
// render against a plain theme with no vars, hence the fallbacks
const tint = (theme: Theme, colour: PaletteKey, opacity: number) =>
    theme.vars
        ? `rgba(${theme.vars.palette[colour].mainChannel} / ${opacity})`
        : alpha(theme.palette[colour].main, opacity)

const paperColour = (theme: Theme) =>
    theme.vars?.palette.background.paper ?? theme.palette.background.paper

const dividerColour = (theme: Theme) =>
    theme.vars?.palette.divider ?? theme.palette.divider

const hoverColour = (theme: Theme) =>
    theme.vars?.palette.action.hover ?? theme.palette.action.hover

// Tints need more opacity in dark mode to read at all
const byScheme = (theme: Theme, style: (opacity: number) => object) => ({
    ...style(0.14),
    ...theme.applyStyles('dark', style(0.24))
})

const tintSx = (theme: Theme, colour: PaletteKey) =>
    byScheme(theme, (opacity) => ({
        backgroundColor: tint(theme, colour, opacity)
    }))

const StyledTableRow = styled(TableRow, {
    shouldForwardProp: (prop) => prop !== 'status'
})<{ status?: Status }>(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    },
    variants: Object.entries(statusPalette).map(([status, colour]) => ({
        props: { status: status as Status },
        style: {
            // the zebra stripe above is the more specific selector, so match it
            // rather than relying on declaration order
            '&, &:nth-of-type(odd)': tintSx(theme, colour)
        }
    }))
}))

// Pinning the first column keeps the row's identity in view once the reader has
// scrolled sideways. Border-collapse eats borders on a sticky cell, hence the
// inset shadow standing in for a right-hand rule
const stickySx = (theme: Theme) => ({
    position: 'sticky' as const,
    left: 0,
    zIndex: 2,
    backgroundColor: paperColour(theme),
    boxShadow: `inset -1px 0 0 ${dividerColour(theme)}`
})

const headSx = (theme: Theme) => ({
    ...stickySx(theme),
    backgroundColor: theme.palette.primary.light,
    zIndex: 3
})

const layer = (colour: string) => `linear-gradient(${colour}, ${colour})`

// The pinned column hides the row behind it, so it restacks the same layers
// itself over its opaque backdrop, earlier layers painting on top
const pinnedSx = (
    theme: Theme,
    colours: (PaletteKey | undefined)[],
    striped: boolean
) => ({
    ...stickySx(theme),
    ...byScheme(theme, (opacity) => ({
        backgroundImage:
            [
                ...colours.map(
                    (colour) => colour && tint(theme, colour, opacity)
                ),
                striped && hoverColour(theme)
            ]
                .filter((colour) => typeof colour === 'string')
                .map(layer)
                .join(', ') || 'none'
    }))
})

export default function BasicTable({
    rows,
    columns
}: {
    rows: Row[]
    columns: Column[]
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    // Scrollbars are hidden until used on macOS, so fade the right-hand edge
    // while there is still table to reach
    const [hasMoreToTheRight, setHasMoreToTheRight] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const update = () =>
            setHasMoreToTheRight(
                container.scrollLeft + container.clientWidth <
                    container.scrollWidth - 1
            )

        update()
        container.addEventListener('scroll', update, { passive: true })

        // jsdom has no ResizeObserver, and the fade is decorative in any case
        const observer =
            typeof ResizeObserver === 'undefined'
                ? undefined
                : new ResizeObserver(update)
        observer?.observe(container)

        return () => {
            container.removeEventListener('scroll', update)
            observer?.disconnect()
        }
    }, [columns, rows])

    return (
        <Box sx={{ position: 'relative' }}>
            <TableContainer component={Paper} ref={containerRef}>
                <Table
                    sx={{
                        minWidth: Math.max(
                            MIN_TABLE_WIDTH,
                            columns.length * COLUMN_WIDTH
                        )
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            {columns.map(({ name }, col_index) => (
                                <StyledTableCell
                                    scope="col"
                                    key={name}
                                    sx={col_index == 0 ? headSx : undefined}
                                >
                                    {name}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, row_index) => {
                            const rowColour =
                                row.status && statusPalette[row.status]
                            // the stripe falls on odd rows, counting from one
                            const striped = row_index % 2 == 0

                            return (
                                <StyledTableRow
                                    key={row_index}
                                    status={row.status}
                                >
                                    {columns.map(({ key }, col_index) => {
                                        const cell = row[key]
                                        const tinted = isTintedCell(cell)
                                        const content = tinted
                                            ? cell.content
                                            : cell
                                        const colour = tinted
                                            ? statusPalette[cell.status]
                                            : undefined
                                        const pinned = col_index == 0

                                        return (
                                            <StyledTableCell
                                                key={key}
                                                component={
                                                    pinned ? 'th' : undefined
                                                }
                                                scope={
                                                    pinned ? 'row' : undefined
                                                }
                                                sx={(theme: Theme) =>
                                                    pinned
                                                        ? pinnedSx(
                                                              theme,
                                                              [
                                                                  colour,
                                                                  rowColour
                                                              ],
                                                              striped
                                                          )
                                                        : colour
                                                          ? tintSx(
                                                                theme,
                                                                colour
                                                            )
                                                          : {}
                                                }
                                            >
                                                {/* div rather than the default p so markdown cells can hold lists */}
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                    sx={markdownSx}
                                                >
                                                    {typeof content ===
                                                    'string' ? (
                                                        <Markdown>
                                                            {content}
                                                        </Markdown>
                                                    ) : (
                                                        content
                                                    )}
                                                </Typography>
                                            </StyledTableCell>
                                        )
                                    })}
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                aria-hidden
                sx={(theme) => ({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 48,
                    pointerEvents: 'none',
                    borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
                    background: `linear-gradient(to right, transparent, ${paperColour(theme)})`,
                    opacity: hasMoreToTheRight ? 1 : 0,
                    transition: theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shorter
                    })
                })}
            />
        </Box>
    )
}
