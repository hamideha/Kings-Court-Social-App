import { gql } from '@apollo/client';

export const GET_MESSAGE_LIKES = gql`
query messageLikes($messageId: Int!) {
    messageLikes(messageId: $messageId) {
        likes
    }
}
`

export const GET_USERS_LIKED_MESSAGES = gql`
query usersLikes($userId: Int!) {
    usersLikes(userId: $userId) {
        id
    }
}
`

export const GET_IS_MESSAGE_LIKED_BY_USER = gql`
query isMessageLikedByUser($userId: Int!, $messageId: Int!) {
    isMessageLikedByUser(userId: $userId, messageId: $messageId)
}
`

export const POST_LIKE = gql`
mutation likeMessage($userId: Int!, $messageId: Int!) {
    likeMessage(userId: $userId, messageId: $messageId) {
        id
        likes
    }
}
`;