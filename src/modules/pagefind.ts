export type PagefindResult = {
    url: string
    meta: { title: string }
    excerpt: string
    filters: Record<string, string[]>
}

export type PagefindModule = {
    search: (query: string | null, options?: { filters?: Record<string, string | string[]> }) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> }>
    init: () => Promise<void>
    filters: () => Promise<Record<string, Record<string, number>>>
}

let pagefindModule: PagefindModule | null = null
let allTags: string[] = []

export function getAllTags(): string[] {
    return allTags
}

export async function getPagefind(): Promise<PagefindModule> {
    if (!pagefindModule) {
        // @ts-expect-error pagefind.js is a static asset generated at build time, not a bundled module
        pagefindModule = (await import(/* webpackIgnore: true */ '/pagefind/pagefind.js')) as PagefindModule
        await pagefindModule.init()
        const filters = await pagefindModule.filters()
        const categoryFilters = filters.category ?? {}
        allTags = Object.entries(categoryFilters)
            .sort((a, b) => b[1] - a[1])
            .map(([name]) => name)
    }
    return pagefindModule
}
