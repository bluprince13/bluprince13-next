import { expect } from '@playwright/test'
import { test } from './fixtures/my-test'

const SCROLLBAR_CLEARANCE = 16

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

    test('the table of contents rail expands on hover and jumps to a heading', async ({ page }) => {
        await page.goto('/blog/preparing-a-will')

        const rail = page.getByRole('button', { name: 'Table of contents' })
        await expect(rail).toBeVisible()
        await expect(page.getByRole('navigation', { name: 'Table of contents' })).toBeHidden()

        await rail.hover()

        const panel = page.getByRole('navigation', { name: 'Table of contents' })
        await expect(panel).toBeVisible()

        const entry = panel.getByRole('link').nth(2)
        const label = (await entry.textContent())!.trim()
        const href = (await entry.getAttribute('href'))!
        await entry.click()

        await expect(panel).toBeHidden()
        await expect(page).toHaveURL(new RegExp(`${href}$`))
        await expect(page.locator('h2, h3').filter({ hasText: label }).first()).toBeInViewport()
    })

    test('the rail sits in the page gutter rather than over the article', async ({ page }) => {
        await page.goto('/blog/preparing-a-will')

        for (const width of [1600, 1024, 700]) {
            await page.setViewportSize({ width, height: 800 })

            const rail = page.getByRole('button', { name: 'Table of contents' })
            const railBox = (await rail.boundingBox())!
            const articleBox = (await page.locator('#post-content').boundingBox())!

            // An overlay scrollbar floats above the page rather than reserving
            // space, so the rail has to stay clear of the last SCROLLBAR_CLEARANCE
            // pixels or the thumb lands on top of the ticks.
            expect(railBox.x).toBeGreaterThanOrEqual(articleBox.x + articleBox.width)
            expect(railBox.x + railBox.width).toBeLessThanOrEqual(width - SCROLLBAR_CLEARANCE)
        }
    })

    test('the rail gives way to the inline table of contents on phones', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto('/blog/preparing-a-will')

        await expect(page.getByRole('button', { name: 'Table of contents' })).toBeHidden()
        await expect(page.locator('#table-of-contents')).toHaveCount(1)
    })

    test('blog post with Mermaid diagram renders SVG', async ({ page }) => {
        await page.goto('/blog/tax-guide-for-uk-based-nris')

        await expect(page.locator('h1')).toContainText('Tax guide for UK-based NRIs')

        // Mermaid renders asynchronously — wait for the SVG to appear
        const mermaidSvg = page.locator('.mermaid svg').first()
        await expect(mermaidSvg).toBeVisible({ timeout: 15000 })
    })
})
