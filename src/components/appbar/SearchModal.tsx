'use client'

import { useState, useEffect, useRef } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { getAllTags, getPagefind, type PagefindResult } from '@Modules/pagefind'

function highlightTitle(title: string, query: string): string {
    if (!query.trim()) return title
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return title.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<PagefindResult[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const hashIndex = query.indexOf('#')
    const isTagMode = hashIndex !== -1
    const textQuery = isTagMode ? query.slice(0, hashIndex) : query
    const tagSearch = isTagMode ? query.slice(hashIndex + 1) : ''
    const filteredTags = isTagMode
        ? getAllTags().filter(t =>
            t.toLowerCase().includes(tagSearch.toLowerCase()) &&
            !selectedTags.includes(t)
          )
        : []

    useEffect(() => {
        if (open) {
            getPagefind()
            const t = setTimeout(() => inputRef.current?.focus(), 50)
            return () => clearTimeout(t)
        } else {
            setQuery('')
            setResults([])
            setSelectedTags([])
            setActiveIndex(0)
        }
    }, [open])

    useEffect(() => {
        if (isTagMode) {
            setActiveIndex(0)
            return
        }
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!textQuery.trim() && selectedTags.length === 0) {
            setResults([])
            setLoading(false)
            return
        }
        debounceRef.current = setTimeout(async () => {
            setLoading(true)
            try {
                const pf = await getPagefind()
                const search = await pf.search(textQuery.trim() || null, {
                    filters: selectedTags.length > 0 ? { category: selectedTags } : undefined,
                })
                const data = await Promise.all(search.results.slice(0, 8).map(r => r.data()))
                setResults(data)
                setActiveIndex(0)
            } finally {
                setLoading(false)
            }
        }, 80)
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [textQuery, selectedTags, isTagMode])

    const addTag = (tag: string) => {
        setSelectedTags(prev => [...prev, tag])
        setQuery(textQuery)
        setActiveIndex(0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const listLength = isTagMode ? filteredTags.length : results.length
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex(i => Math.min(i + 1, listLength - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex(i => Math.max(i - 1, 0))
        } else if (e.key === 'Enter') {
            if (isTagMode && filteredTags[activeIndex]) {
                addTag(filteredTags[activeIndex])
            } else if (!isTagMode && results[activeIndex]) {
                router.push(results[activeIndex].url)
                onClose()
            }
        }
    }

    const showNavigateHint = selectedTags.length > 0 || (!isTagMode && results.length > 0)
    const footerHint = showNavigateHint
        ? '↑↓ navigate · ↵ open · # to add tag'
        : 'type to search · # to filter by tag'

    const kbdSx = {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 0.5,
        px: 0.75,
        py: 0.15,
        fontSize: '0.6rem',
        fontFamily: 'monospace',
        color: 'text.disabled',
        lineHeight: 1.4,
    } as const

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-container': { alignItems: 'flex-start', pt: '10vh' },
                '& .MuiDialog-paper': { borderRadius: 3, overflow: 'hidden', m: 2 },
            }}
        >
            {/* Input row */}
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.5 }}>
                <SearchIcon sx={{ color: 'text.disabled', fontSize: '1.15rem', flexShrink: 0 }} />
                {selectedTags.map(tag => (
                    <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onDelete={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                        sx={{ height: 22, fontSize: '0.7rem', flexShrink: 0 }}
                    />
                ))}
                <InputBase
                    inputRef={inputRef}
                    fullWidth
                    placeholder={selectedTags.length > 0 ? 'Filter within tags…' : 'Search posts…'}
                    value={query}
                    onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
                    onKeyDown={handleKeyDown}
                    sx={{ fontSize: '0.95rem' }}
                    autoComplete="off"
                />
                <Box component="kbd" sx={kbdSx}>esc</Box>
            </Box>

            <Divider />

            {/* Body */}
            <Box sx={{ overflowY: 'auto', maxHeight: '55vh' }}>

                {/* Tag mode */}
                {isTagMode && (
                    <Box sx={{ px: 1, pb: 1, pt: 0.5 }}>
                        {filteredTags.length === 0 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 1 }}>
                                <SearchOffIcon sx={{ fontSize: '2rem', color: 'text.disabled' }} />
                                <Typography variant="body2" color="text.secondary">No tags match</Typography>
                            </Box>
                        ) : (
                            filteredTags.map((tag, i) => (
                                <Box
                                    key={tag}
                                    onClick={() => addTag(tag)}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.25,
                                        px: 1.25,
                                        py: 0.75,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        mb: 0.25,
                                        backgroundColor: i === activeIndex ? 'action.selected' : 'transparent',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                        transition: 'background-color 0.1s',
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>🏷</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{tag}</Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                )}

                {/* Loading — only on first load before any results exist */}
                {!isTagMode && loading && results.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress size={22} />
                    </Box>
                )}

                {/* Empty (no query, no tag) */}
                {!isTagMode && !loading && !textQuery.trim() && selectedTags.length === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 1 }}>
                        <SearchIcon sx={{ fontSize: '2rem', color: 'text.disabled' }} />
                        <Typography variant="body2" color="text.secondary">Start typing to search</Typography>
                        <Typography variant="caption" color="text.disabled">Searches titles, content and categories</Typography>
                    </Box>
                )}

                {/* No results */}
                {!isTagMode && !loading && (textQuery.trim() || selectedTags.length > 0) && results.length === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 1 }}>
                        <SearchOffIcon sx={{ fontSize: '2rem', color: 'text.disabled' }} />
                        <Typography variant="body2" color="text.secondary">
                            No results{textQuery.trim() ? <> for <strong>&ldquo;{textQuery}&rdquo;</strong></> : null}
                        </Typography>
                    </Box>
                )}

                {/* Results — stay visible while a new search is in flight */}
                {!isTagMode && results.length > 0 && (
                    <>
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                px: 2, pt: 1, pb: 0.5,
                                color: 'text.disabled',
                                fontWeight: 700,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                fontSize: '0.62rem',
                            }}
                        >
                            {results.length} {results.length === 1 ? 'result' : 'results'}
                        </Typography>
                        <Box sx={{ px: 1, pb: 1 }}>
                            {results.map((result, i) => (
                                <Box
                                    key={result.url}
                                    component={NextLink}
                                    href={result.url}
                                    onClick={onClose}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1.25,
                                        px: 1.25,
                                        py: 1,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        mb: 0.25,
                                        backgroundColor: i === activeIndex ? 'action.selected' : 'transparent',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                        transition: 'background-color 0.1s',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 30, height: 30,
                                            borderRadius: 1.5,
                                            border: '1px solid',
                                            borderColor: i === activeIndex ? 'primary.main' : 'divider',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0,
                                            mt: 0.25,
                                            color: i === activeIndex ? 'primary.main' : 'text.disabled',
                                            bgcolor: i === activeIndex ? 'action.selected' : 'transparent',
                                        }}
                                    >
                                        <ArticleOutlinedIcon sx={{ fontSize: '0.9rem' }} />
                                    </Box>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            component="div"
                                            sx={{
                                                fontWeight: 500,
                                                mb: 0.25,
                                                color: i === activeIndex ? 'text.primary' : 'text.secondary',
                                            }}
                                            dangerouslySetInnerHTML={{ __html: highlightTitle(result.meta.title, textQuery) }}
                                        />
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            sx={{ color: 'text.disabled', lineHeight: 1.5 }}
                                            dangerouslySetInnerHTML={{ __html: result.excerpt }}
                                        />
                                        {result.filters?.category?.length > 0 && (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
                                            >
                                                {result.filters.category.join(' · ')}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </Box>

            {/* Footer hint */}
            <Divider />
            <Box sx={{ px: 2, py: 0.75 }}>
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.62rem' }}>
                    {footerHint}
                </Typography>
            </Box>
        </Dialog>
    )
}
