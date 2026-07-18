import { expect } from '@playwright/test'
import { test } from './fixtures/my-test'

test.describe('Blog', () => {
    test('blog index lists posts with links', async ({ standardPage }) => {
        await standardPage.gotoMenuItem('Blog')
        await expect(standardPage.heading).toContainText('Blog')

        const postLinks = standardPage.page.locator('a[href^="/blog/"]')
        await expect(postLinks).not.toHaveCount(0)
    })

    test('clicking a blog post navigates to the post', async ({ standardPage }) => {
        await standardPage.gotoMenuItem('Blog')

        const firstPostLink = standardPage.page.locator('a[href^="/blog/"]').first()
        const postTitle = await firstPostLink.locator('h6').textContent()
        await firstPostLink.click()

        await expect(standardPage.heading).toContainText(postTitle!)
    })

    test('blog post with Mermaid diagram renders SVG', async ({ page }) => {
        await page.goto('/blog/tax-guide-for-uk-based-nris')

        await expect(page.locator('h1')).toContainText('Tax guide for UK-based NRIs')

        // Mermaid renders asynchronously — wait for the SVG to appear
        const mermaidSvg = page.locator('.mermaid svg').first()
        await expect(mermaidSvg).toBeVisible({ timeout: 15000 })
    })
})
