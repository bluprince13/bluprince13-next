import { Comments, CommentCount } from '@hyvor/hyvor-talk-react';

const HYVOR_WEBSITE_ID = 2205

export default {
    CommentCount: ({ id }) => (
        <CommentCount website-id={HYVOR_WEBSITE_ID} page-id={id} />
    ),
    Embed: ({ id }) => <Comments website-id={HYVOR_WEBSITE_ID} page-id={id} />
}
