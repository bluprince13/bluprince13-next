import HyvorTalk from 'hyvor-talk-react'

const HYVOR_WEBSITE_ID = 2205

export default {
    CommentCount: ({ id }) => (
        <HyvorTalk.CommentCount websiteId={HYVOR_WEBSITE_ID} id={id} />
    ),
    Embed: ({ id }) => <HyvorTalk.Embed websiteId={HYVOR_WEBSITE_ID} id={id} />
}
