import type { CommentCountProps } from '@hyvor/hyvor-talk-base'

// `MyCommentCount` renders Hyvor's custom element directly so that it is in the
// DOM before `CommentCounts.load()` runs. React needs it declared to accept the
// hyphenated attributes the embed reads.
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'hyvor-talk-comment-count': CommentCountProps
        }
    }
}
