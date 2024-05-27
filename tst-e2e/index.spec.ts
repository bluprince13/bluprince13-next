import { expect } from '@playwright/test'
import { test } from './fixtures/my-test'

test.describe('Navigation', () => {
    test('test navigation to all standardPages', async ({ standardPage }) => {
        await expect(standardPage.heading).toContainText('Hello human')

        await standardPage.gotoMenuItem('Blog')
        await expect(standardPage.heading).toContainText('Blog')

        await standardPage.gotoMenuItem('Apps')
        await expect(standardPage.heading).toContainText('Apps')

        await standardPage.gotoMenuItem('CV')
        await expect(standardPage.heading).toContainText('CV')

        await standardPage.gotoLink('Uses')
        await expect(standardPage.heading).toContainText('Uses')

        await standardPage.gotoLink('Kudos')
        await expect(standardPage.heading).toContainText('Kudos')

        await standardPage.gotoLink('Values')
        await expect(standardPage.heading).toContainText('Values')

        await standardPage.gotoLink('Privacy policy')
        await expect(standardPage.heading).toContainText('Privacy policy')
    })
})
