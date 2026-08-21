'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export const POST_CONTENT_ID = 'post-content'

// The rail lives inside the horizontal padding <main> reserves from `sm` up (40px),
// so it never sits on top of the article text. EDGE_INSET clears an overlay
// scrollbar, which floats above the page instead of reserving space of its own —
// unlike a classic scrollbar, it does not shrink the viewport out from under a
// fixed element. The e2e test 'the rail sits in the page gutter rather than over
// the article' holds all three numbers in step.
const RAIL_WIDTH = 24
const EDGE_INSET = 16

type Heading = {
    id: string
    text: string
    level: number
}

// rehype-autolink-headings appends a '#' link to every heading, which is not
// part of the heading's own text.
function headingText(heading: HTMLHeadingElement) {
    const clone = heading.cloneNode(true) as HTMLElement
    clone.querySelector('.anchor')?.remove()
    return clone.textContent?.trim() ?? ''
}

function readHeadings(): Heading[] {
    const article = document.getElementById(POST_CONTENT_ID)
    if (!article) return []

    return Array.from(article.querySelectorAll<HTMLHeadingElement>('h2, h3'))
        .filter(h => h.id && h.id !== 'table-of-contents')
        .map(h => ({ id: h.id, text: headingText(h), level: Number(h.tagName[1]) }))
}

function useActiveHeading(headings: Heading[]) {
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return

        const elements = headings
            .map(({ id }) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)

        const visible = new Set<string>()
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) visible.add(entry.target.id)
                    else visible.delete(entry.target.id)
                }

                const firstVisible = elements.find(el => visible.has(el.id))
                if (firstVisible) {
                    setActiveId(firstVisible.id)
                    return
                }

                // Between two widely spaced headings nothing is in the band, so
                // fall back to the last one scrolled past.
                const passed = elements.filter(el => el.getBoundingClientRect().top < 0)
                setActiveId(passed.length > 0 ? passed[passed.length - 1].id : null)
            },
            { rootMargin: '0px 0px -66% 0px' }
        )

        elements.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [headings])

    return activeId
}

function TocList({
    headings,
    activeId,
    onSelect
}: {
    headings: Heading[]
    activeId: string | null
    onSelect: () => void
}) {
    return (
        <List dense disablePadding component="nav" aria-label="Table of contents">
            {headings.map(({ id, text, level }) => {
                const active = id === activeId
                return (
                    <ListItemButton
                        key={id}
                        component="a"
                        href={`#${id}`}
                        onClick={onSelect}
                        sx={{
                            py: 0.5,
                            pl: level === 3 ? 3 : 1.5,
                            borderLeft: '2px solid',
                            borderColor: active ? 'primary.main' : 'divider',
                            color: active ? 'primary.main' : 'text.secondary'
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400 }}>
                            {text}
                        </Typography>
                    </ListItemButton>
                )
            })}
        </List>
    )
}

// A tick per heading, right-aligned so the shorter h3 ticks read as indented.
function Rail({ headings, activeId }: { headings: Heading[]; activeId: string | null }) {
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', py: 1, pr: '4px' }}
        >
            {headings.map(({ id, level }) => (
                <Box
                    key={id}
                    sx={{
                        height: '2px',
                        borderRadius: '1px',
                        width: level === 3 ? '7px' : '12px',
                        bgcolor: id === activeId ? 'primary.main' : 'text.disabled',
                        transition: 'background-color 0.2s'
                    }}
                />
            ))}
        </Box>
    )
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [expanded, setExpanded] = useState(false)
    const activeId = useActiveHeading(headings)

    // The headings only exist once the server-rendered article is in the DOM, so
    // reading them during render would break hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setHeadings(readHeadings()), [])

    if (headings.length < 2) return null

    return (
        <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <Box
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                onKeyDown={event => event.key === 'Escape' && setExpanded(false)}
                sx={{
                    // Phones have no usable gutter and their own edge-swipe
                    // gestures live here; the inline TOC covers them instead.
                    display: { xs: 'none', sm: 'block' },
                    position: 'fixed',
                    right: `${EDGE_INSET}px`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: theme => theme.zIndex.appBar
                }}
            >
                <Box
                    component="button"
                    type="button"
                    aria-label="Table of contents"
                    aria-expanded={expanded}
                    // Open-only: a tap fires mouseenter first, so toggling here
                    // would immediately close what the hover just opened.
                    onClick={() => setExpanded(true)}
                    sx={{
                        display: 'block',
                        width: `${RAIL_WIDTH}px`,
                        p: 0,
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        opacity: expanded ? 0 : 1,
                        transition: 'opacity 0.15s'
                    }}
                >
                    <Rail headings={headings} activeId={activeId} />
                </Box>
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        width: 280,
                        maxWidth: 'calc(100vw - 32px)',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        py: 1,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        opacity: expanded ? 1 : 0,
                        visibility: expanded ? 'visible' : 'hidden',
                        transform: expanded ? 'translate(0, -50%)' : 'translate(8px, -50%)',
                        transition: 'opacity 0.18s, transform 0.18s, visibility 0.18s'
                    }}
                >
                    <TocList headings={headings} activeId={activeId} onSelect={() => setExpanded(false)} />
                </Paper>
            </Box>
        </ClickAwayListener>
    )
}
