import { expect } from '@playwright/test'
import { test } from './fixtures/my-test'

const KEY_PAGES = [
    { path: '/', heading: 'Hello human' },
    { path: '/blog', heading: 'Blog' },
    { path: '/apps', heading: 'Apps' },
    { path: '/slides', heading: 'Slides' },
    { path: '/cv', heading: 'CV' },
    { path: '/uses', heading: 'Uses' },
    { path: '/kudos', heading: 'Kudos' },
    { path: '/values', heading: 'Values' },
    { path: '/privacypolicy', heading: 'Privacy policy' },
]

for (const { path, heading } of KEY_PAGES) {
    test(`${path} loads with correct heading and no console errors`, async ({ page }) => {
        const consoleErrors: string[] = []
        page.on('console', msg => {
            if (msg.type() !== 'error') return
            const text = msg.text()
            // Ignore network errors from third-party services (e.g. comments widget)
            if (text.includes('ws://') || text.includes('wss://')) return
            // Vercel Analytics / Speed Insights scripts are only served on
            // Vercel deployments, so they 404 when running the build locally
            const url = msg.location().url
            if (url.includes('/_vercel/')) return
            // Third-party scripts (e.g. Google Analytics) may be unreachable
            // in the test environment — only fail on errors from our own app
            if (url.startsWith('http') && !url.includes('localhost')) return
            consoleErrors.push(text)
        })

        await page.goto(path)
        await expect(page.locator('h1')).toContainText(heading)
        expect(consoleErrors, `Console errors on ${path}: ${consoleErrors.join(', ')}`).toHaveLength(0)
    })
}
