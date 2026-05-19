import { expect } from '@playwright/test'
import { test } from './fixtures/my-test'

const KEY_PAGES = [
    { path: '/', heading: 'Hello human' },
    { path: '/blog', heading: 'Blog' },
    { path: '/apps', heading: 'Apps' },
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
            consoleErrors.push(text)
        })

        await page.goto(path)
        await expect(page.locator('h1')).toContainText(heading)
        expect(consoleErrors, `Console errors on ${path}: ${consoleErrors.join(', ')}`).toHaveLength(0)
    })
}
