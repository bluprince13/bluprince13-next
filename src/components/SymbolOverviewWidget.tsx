import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

const SymbolOverview = dynamic(
    () => import('react-ts-tradingview-widgets').then((w) => w.SymbolOverview),
    {
        ssr: false
    }
)

export const SymbolOverviewWidget = (props) => (
    <Box sx={{ marginTop: 2, marginBottom: 5, height: '400px' }}>
        <SymbolOverview widgetFontColor="#000000" {...props} />
    </Box>
)
