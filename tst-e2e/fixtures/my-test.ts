import { test as base } from '@playwright/test'
import { StandardPage } from './standard-page'

type MyFixtures = {
    standardPage: StandardPage
}

export const test = base.extend<MyFixtures>({
    standardPage: async ({ page }, use) => {
        const standardPage = new StandardPage(page)
        await standardPage.goto()

        await use(standardPage)
    }
})
