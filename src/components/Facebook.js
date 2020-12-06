import { FacebookProvider, Like } from 'react-facebook'

const FACEBOOK_APP_ID = 363651398085984

export default ({ href }) => {
    return (
        <div style={{ paddingTop: '1rem' }}>
            <FacebookProvider appId={FACEBOOK_APP_ID}>
                <Like href={href} colorScheme="light" showFaces share />
            </FacebookProvider>
        </div>
    )
}
