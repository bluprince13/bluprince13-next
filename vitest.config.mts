import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [react()],
    test: {
        dir: 'tst',
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        exclude: ['node_modules', '.next', 'tst-e2e', '.claude'],
        coverage: {
            provider: 'v8',
            reportsDirectory: 'coverage',
        },
    },
})
