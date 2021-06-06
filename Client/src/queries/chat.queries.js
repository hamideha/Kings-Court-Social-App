import { gql } from '@apollo/client';

export const SUBSCRIBE_NEW_CHAT = gql`
subscription chatSent {
    chatSent {
        id
        user {
            firstName
            lastName
            profilePicture
            id
        }
        content
    }
}
`

export const GET_CHATS = gql`
query chats {
    chats {
        id
        user {
            firstName
            lastName
            profilePicture
            id
        }
        content
    }
}
`

export const POST_CHAT = gql`
mutation postChat($content: String!, $userId: Int!) {
    postChat(content: $content, userId: $userId) {
        id
        content
        createdAt
    }
}
`;