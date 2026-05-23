import { startTransition } from 'react'
import { useColorScheme } from '@mui/material/styles'

export function useColorMode() {
    const { mode, systemMode, setMode } = useColorScheme()
    const resolvedMode = mode === 'system' ? systemMode : mode
    const isDark = resolvedMode === 'dark'

    const toggleColorMode = () => {
        startTransition(() => {
            setMode(isDark ? 'light' : 'dark')
        })
    }

    return { mode, resolvedMode, isDark, setMode, toggleColorMode }
}
