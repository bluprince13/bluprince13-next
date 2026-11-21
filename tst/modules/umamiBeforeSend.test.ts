import { afterEach, describe, expect, it } from 'vitest'
import { umamiBeforeSend } from '@Modules/umamiBeforeSend'

const visit = (path: string) => window.history.replaceState(null, '', path)

describe('umamiBeforeSend', () => {
    afterEach(() => visit('/'))

    it('restores only the UTM tags on a pageview', () => {
        visit('/blog/post?utm_source=newsletter&email=me%40example.com&utm_medium=email')

        expect(umamiBeforeSend('event', { url: '/blog/post' })).toEqual({
            url: '/blog/post?utm_source=newsletter&utm_medium=email'
        })
    })

    it('leaves pageviews without UTM tags alone', () => {
        visit('/blog/post?q=secret')

        expect(umamiBeforeSend('event', { url: '/blog/post' })).toEqual({ url: '/blog/post' })
    })

    it('leaves custom events alone', () => {
        visit('/blog/post?utm_source=newsletter')
        const payload = { url: '/blog/post', name: 'search' }

        expect(umamiBeforeSend('event', payload)).toBe(payload)
    })
})
