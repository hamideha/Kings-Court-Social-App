import { gql } from '@apollo/client';

export const GET_MESSAGE_LIKES = gql`
query messageLikes($messageId: Int!) {
    messageLikes(messageId: $messageId) {
        likes
    }
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