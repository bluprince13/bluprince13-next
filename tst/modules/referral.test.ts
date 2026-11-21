import { isReferralUrl, referralProgramme } from '@Modules/referral'

describe('isReferralUrl', () => {
    it.each([
        'https://amzn.to/3Htmecp',
        'https://link.amazon/B014mOrwW',
        'https://www.amazon.co.uk/dp/B000?tag=bluprince13-21',
        'https://wise.com/invite/ihpc/vipina2',
        'https://zerodha.com/?c=XI4704&s=CONSOLE',
        'https://www.ii.co.uk/recommend-ii?ii_referrer=abc',
    ])('flags %s', (href) => {
        expect(isReferralUrl(href)).toBe(true)
    })

    it.each([
        undefined,
        '#section',
        'https://wise.com',
        'https://vance.onelink.me/DYot/0fwxcjs1',
        'https://zerodha.com/open-account/nri/',
        'https://aws.amazon.com/certification/',
        'https://unsplash.com/@jeshoots?utm_medium=referral',
    ])('does not flag %s', (href) => {
        expect(isReferralUrl(href)).toBe(false)
    })
})

describe('referralProgramme', () => {
    it.each([
        ['https://amzn.to/3Htmecp', 'amazon'],
        ['https://link.amazon/B014mOrwW', 'amazon'],
        ['https://wise.com/invite/ihpc/vipina2', 'wise'],
        ['https://zerodha.com/?c=XI4704&s=CONSOLE', 'zerodha'],
        ['https://www.ii.co.uk/recommend-ii?ii_referrer=abc', 'ii'],
    ])('names the programme for %s', (href, programme) => {
        expect(referralProgramme(href)).toBe(programme)
    })

    it('is null for other links', () => {
        expect(referralProgramme('https://wise.com')).toBeNull()
        expect(referralProgramme(undefined)).toBeNull()
    })
})
