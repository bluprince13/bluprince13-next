import Figure from '@Components/Figure'
import Youtube from '@Components/Youtube'
import Timeline from '@Components/Timeline'
import Table from '@Components/Table'
import Alert from '@Components/Alert'
import { ComparisonTable } from '@Components/ComparisonTable'
import { Mermaid } from '@Components/Mermaid'
import { SymbolOverviewWidget } from '@Components/SymbolOverviewWidget'
import { Typography } from '@mui/material'
import Link from 'next/link'

export const mdxComponents = {
    Figure,
    Youtube,
    Timeline,
    Table,
    Alert,
    ComparisonTable,
    Mermaid,
    mermaid: Mermaid,
    SymbolOverviewWidget,
    Typography,
    Link,
}
