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

    test('every post card shows a comment count', async ({ page }) => {
        await page.goto('/blog')

        // Counts are server-rendered rather than fetched by Hyvor's embed, which
        // used to race its own loader and leave them blank.
        const cards = page.locator('a[href^="/blog/"]')
        const total = await cards.count()
        expect(total).toBeGreaterThan(0)

        const withCount = page.locator('a[href^="/blog/"]', { hasText: /\d+ comments?/ })
        await expect(withCount).toHaveCount(total)
        await expect(page.locator('hyvor-talk-comment-count')).toHaveCount(0)
    })

    test('post page renders its live comment count', async ({ page }) => {
        await page.goto('/blog/applying-for-oci-for-british-minor')

        const widget = page.locator('hyvor-talk-comment-count')
        await expect(widget).toHaveCount(1)
        await expect(widget).toHaveText(/\d+ Comments?/i, { timeout: 15000 })
    })

    test('sort menu reorders posts and reflects the choice in the URL', async ({ page }) => {
        await page.goto('/blog')

        const sortButton = page.locator('button[aria-label^="Sort by"]')
        await expect(sortButton).toHaveAttribute('aria-label', 'Sort by Date, descending')

        const titles = page.locator('a[href^="/blog/"] h6')
        const byDate = await titles.allTextContents()

        await sortButton.click()
        await page.getByRole('menuitem', { name: 'Sort by Views' }).click()

        await expect(page).toHaveURL(/\?sort=views$/)
        await expect(sortButton).toHaveAttribute('aria-label', 'Sort by Views, descending')

        const byViews = await titles.allTextContents()
        expect(byViews).not.toEqual(byDate)
        expect([...byViews].sort()).toEqual([...byDate].sort())
    })

    test('re-picking the active sort field flips the direction', async ({ page }) => {
        await page.goto('/blog?sort=comments')

        const sortButton = page.locator('button[aria-label^="Sort by"]')
        await expect(sortButton).toHaveAttribute('aria-label', 'Sort by Comments, descending')

        // The most-commented post leads descending and trails ascending. Posts
        // tied on comment count keep a stable newest-first order either way, so
        // the two orderings are not exact reverses of each other.
        const titles = page.locator('a[href^="/blog/"] h6')
        const mostCommented = 'Applying for OCI for British minor'
        await expect(titles.first()).toHaveText(mostCommented)

        await sortButton.click()
        await page.getByRole('menuitem', { name: 'Sort by Comments, descending' }).click()

        await expect(page).toHaveURL(/\?sort=comments&dir=asc$/)
        await expect(sortButton).toHaveAttribute('aria-label', 'Sort by Comments, ascending')
        await expect(titles.last()).toHaveText(mostCommented)
    })

    test('sorting survives a tag filter', async ({ page }) => {
        await page.goto('/blog?sort=views&dir=asc')

        const firstChip = page.locator('a[href^="/blog/"] .MuiChip-root').first()
        const tag = (await firstChip.textContent())!.trim()
        await firstChip.click()

        await expect(page).toHaveURL(new RegExp(`tag=${encodeURIComponent(tag)}.*sort=views&dir=asc`))
        await expect(page.locator('button[aria-label^="Sort by"]')).toHaveAttribute(
            'aria-label',
            'Sort by Views, ascending'
        )
    })

    test('blog post with Mermaid diagram renders SVG', async ({ page }) => {
        await page.goto('/blog/tax-guide-for-uk-based-nris')

        await expect(page.locator('h1')).toContainText('Tax guide for UK-based NRIs')

        // Mermaid renders asynchronously — wait for the SVG to appear
        const mermaidSvg = page.locator('.mermaid svg').first()
        await expect(mermaidSvg).toBeVisible({ timeout: 15000 })
    })
})
