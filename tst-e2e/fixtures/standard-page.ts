import type { Page, Locator } from '@playwright/test'

export class StandardPage {
    public readonly heading: Locator

    constructor(public readonly page: Page) {
        this.heading = this.page.locator('h1')
    }

    async goto() {
        await this.page.goto('/')
    }

    // Tests run at a desktop viewport, where nav links are inline in the app
    // bar (the hamburger menu only renders on mobile widths)
    async gotoMenuItem(menuItemName: string) {
        await this.page
            .getByRole('banner')
            .getByRole('link', { name: menuItemName })
            .click()
    }

    async gotoLink(linkName: string) {
        await this.page.getByRole('link', { name: linkName }).click()
    }
}
