import type { Page, Locator } from '@playwright/test'

export class StandardPage {
    public readonly menu: Locator
    public readonly heading: Locator

    constructor(public readonly page: Page) {
        this.menu = this.page.getByLabel('open drawer')
        this.heading = this.page.locator('h1')
    }

    async goto() {
        await this.page.goto('/')
    }

    async gotoMenuItem(menuItemName: string) {
        await this.menu.click()
        await this.page.getByRole('menuitem', { name: menuItemName }).click()
    }

    async gotoLink(linkName: string) {
        await this.page.getByRole('link', { name: linkName }).click()
    }
}
