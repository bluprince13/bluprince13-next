const REFERRAL_PATTERNS = [
    /^https?:\/\/amzn\.to\//,
    /^https?:\/\/link\.amazon\//,
    /^https?:\/\/(www\.)?amazon\.[a-z.]+\/.*[?&]tag=/,
    /^https?:\/\/wise\.com\/invite\//,
    /^https?:\/\/(www\.)?zerodha\.com\/.*[?&]c=/,
    /^https?:\/\/vance\.onelink\.me\//,
    /^https?:\/\/(www\.)?ii\.co\.uk\/recommend-ii/,
]

export const isReferralUrl = (href?: string) =>
    !!href && REFERRAL_PATTERNS.some((pattern) => pattern.test(href))
