import * as React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Divider,
    Box
} from '@mui/material'
import Markdown from 'react-markdown'

interface CellContent {
    content: string | React.ReactNode
    status: 'bad' | 'neutral' | 'good'
}

interface Header {
    name: string
    description?: string
}

interface TableProps {
    columnHeaders: Header[]
    rowHeaders: Header[]
    rows: CellContent[][]
    summary: string
}

const getStatusColor = (status: 'bad' | 'neutral' | 'good') => {
    switch (status) {
        case 'bad':
            return '#FFEBEE'
        case 'neutral':
            return '#FFFDE7'
        case 'good':
            return '#E8F5E9'
        default:
            return 'white'
    }
}

const tableCellSx = {
    backgroundColor: 'background.paper',
    border: '1px solid rgba(224, 224, 224, 1)',
    '&:hover': {
        backgroundColor: 'grey.200'
    }
}

const TableHeaderCell: React.FC<{
    name: string
    description?: string
}> = ({ name, description }) => {
    return (
        <TableCell sx={tableCellSx}>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
            >
                <Markdown>{name}</Markdown>
            </Typography>
            {description && (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.8rem',
                        textAlign: 'center',
                        maxWidth: 200,
                        wordWrap: 'break-word',
                        margin: 'auto'
                    }}
                >
                    <Markdown>{description}</Markdown>
                </Typography>
            )}
        </TableCell>
    )
}

export const ComparisonTable: React.FC<TableProps> = ({
    columnHeaders,
    rowHeaders,
    rows,
    summary
}) => {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="comparison table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={tableCellSx}></TableCell>
                            {columnHeaders.map(({ name, description }) => (
                                <TableHeaderCell
                                    key={name}
                                    name={name}
                                    description={description}
                                />
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableHeaderCell
                                    key={rowHeaders[rowIndex].name}
                                    name={rowHeaders[rowIndex].name}
                                    description={
                                        rowHeaders[rowIndex].description
                                    }
                                />
                                {row.map((cell, cellIndex) => (
                                    <TableCell
                                        key={cellIndex}
                                        align="center"
                                        sx={{
                                            ...tableCellSx,
                                            backgroundColor: getStatusColor(
                                                cell.status
                                            )
                                        }}
                                    >
                                        <span>{cell.content}</span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {summary && (
                <>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', marginTop: 2 }}
                    >
                        Summary:
                    </Typography>
                    <Typography variant="body1">{summary}</Typography>
                </>
            )}
            <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        </Box>
    )
}
