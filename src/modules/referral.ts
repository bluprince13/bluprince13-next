export type ReferralProgramme = 'amazon' | 'wise' | 'zerodha' | 'ii'

const REFERRAL_PATTERNS: [ReferralProgramme, RegExp][] = [
    ['amazon', /^https?:\/\/amzn\.to\//],
    ['amazon', /^https?:\/\/link\.amazon\//],
    ['amazon', /^https?:\/\/(www\.)?amazon\.[a-z.]+\/.*[?&]tag=/],
    ['wise', /^https?:\/\/wise\.com\/invite\//],
    ['zerodha', /^https?:\/\/(www\.)?zerodha\.com\/.*[?&]c=/],
    ['ii', /^https?:\/\/(www\.)?ii\.co\.uk\/recommend-ii/],
]

export const referralProgramme = (href?: string): ReferralProgramme | null =>
    (href && REFERRAL_PATTERNS.find(([, pattern]) => pattern.test(href))?.[0]) || null

export const isReferralUrl = (href?: string) => referralProgramme(href) !== null
