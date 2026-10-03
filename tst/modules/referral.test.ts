import { isReferralUrl } from '@Modules/referral'

describe('isReferralUrl', () => {
    it.each([
        'https://amzn.to/3Htmecp',
        'https://link.amazon/B014mOrwW',
        'https://www.amazon.co.uk/dp/B000?tag=bluprince13-21',
        'https://wise.com/invite/ihpc/vipina2',
        'https://zerodha.com/?c=DXK651&s=CONSOLE',
        'https://vance.onelink.me/DYot/0fwxcjs1',
        'https://www.ii.co.uk/recommend-ii?ii_referrer=abc',
    ])('flags %s', (href) => {
        expect(isReferralUrl(href)).toBe(true)
    })

    it.each([
        undefined,
        '#section',
        'https://wise.com',
        'https://zerodha.com/open-account/nri/',
        'https://aws.amazon.com/certification/',
        'https://unsplash.com/@jeshoots?utm_medium=referral',
    ])('does not flag %s', (href) => {
        expect(isReferralUrl(href)).toBe(false)
    })
})
