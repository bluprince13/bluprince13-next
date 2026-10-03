import type { ComponentProps } from 'react'
import { isReferralUrl } from '@Modules/referral'
import styles from './Anchor.module.css'

const Anchor = ({ href, rel, ...props }: ComponentProps<'a'>) => {
    if (!isReferralUrl(href)) return <a href={href} rel={rel} {...props} />

    // The non-breaking space keeps the badge on the same line as the end of the link
    return (
        <>
            <a href={href} rel={[rel, 'sponsored'].filter(Boolean).join(' ')} {...props} />
            {' '}
            <span className={styles.badge} title="I may earn a reward if you use this link, at no extra cost to you.">
                referral
            </span>
        </>
    )
}

export default Anchor
