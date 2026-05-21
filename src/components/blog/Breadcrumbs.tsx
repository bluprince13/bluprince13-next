'use client'

import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface Props {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
    return (
        <MuiBreadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            <MuiLink component={NextLink} href="/" underline="hover" color="inherit">
                Home
            </MuiLink>
            {items.map((item, i) =>
                i < items.length - 1 ? (
                    <MuiLink key={item.label} component={NextLink} href={item.href!} underline="hover" color="inherit">
                        {item.label}
                    </MuiLink>
                ) : (
                    <Typography key={item.label} color="text.primary" noWrap sx={{ maxWidth: { xs: 180, sm: 400, md: 'none' } }}>
                        {item.label}
                    </Typography>
                )
            )}
        </MuiBreadcrumbs>
    )
}
