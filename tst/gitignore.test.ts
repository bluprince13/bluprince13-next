import { spawnSync } from 'child_process'
import { globSync } from 'fs'

// Guards against .gitignore patterns silently excluding source files from the
// repo (e.g. `**/feed.xml` once matched src/app/feed.xml/route.ts, so the RSS
// route worked locally but was never deployed).
describe('.gitignore', () => {
    it('does not ignore any source file under src/', () => {
        const files = globSync('src/**/*.{ts,tsx,mdx}')
        expect(files.length).toBeGreaterThan(0)
        const { stdout } = spawnSync('git', ['check-ignore', '--no-index', ...files], {
            encoding: 'utf8',
        })
        expect(stdout.trim().split('\n').filter(Boolean)).toEqual([])
    })
})
