'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { SORT_FIELDS, SORT_LABELS, type Sort, type SortField } from '@Modules/blogSort'

type Props = {
    sort: Sort
    onChange: (sort: Sort) => void
}

export default function BlogSortMenu({ sort, onChange }: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    function handleSelect(field: SortField) {
        setAnchorEl(null)
        // Re-picking the current field flips direction; a new field starts
        // descending — newest, most viewed and most discussed first.
        onChange({
            field,
            direction: field === sort.field && sort.direction === 'desc' ? 'asc' : 'desc'
        })
    }

    const DirectionIcon = sort.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon
    const directionLabel = sort.direction === 'asc' ? 'ascending' : 'descending'

    return (
        <>
            <Button
                size="small"
                color="inherit"
                onClick={e => setAnchorEl(e.currentTarget)}
                startIcon={<SwapVertIcon fontSize="small" />}
                endIcon={<DirectionIcon fontSize="small" />}
                aria-haspopup="menu"
                aria-expanded={open ? true : undefined}
                aria-label={`Sort by ${SORT_LABELS[sort.field]}, ${directionLabel}`}
                sx={{ textTransform: 'none', color: 'text.secondary', flexShrink: 0 }}
            >
                {SORT_LABELS[sort.field]}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {SORT_FIELDS.map(field => {
                    const active = field === sort.field
                    return (
                        <MenuItem
                            key={field}
                            selected={active}
                            onClick={() => handleSelect(field)}
                            aria-label={
                                active
                                    ? `Sort by ${SORT_LABELS[field]}, ${directionLabel}`
                                    : `Sort by ${SORT_LABELS[field]}`
                            }
                            sx={{ gap: 2 }}
                        >
                            <ListItemText>{SORT_LABELS[field]}</ListItemText>
                            {active && <DirectionIcon fontSize="small" />}
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
    )
}
