import { gql } from '@apollo/client';

export const SUBSCRIBE_NEW_MESSAGE = gql`
subscription messageAdded {
    messageAdded {
        id
        createdAt
        content
        likes
        user {
            firstName
            lastName
             profilePicture
        }
    }
}
`;

export const SUBSCRIBE_PAGINATED_MESSAGES = gql`
subscription PaginateMessages($limit: Int!, $offset: Int!) {
    PaginateMessages(limit: $limit, offset: $offset){
        hasMore
        rows {
            id
            createdAt
            content
            likes
            user {
                firstName
                lastName
                profilePicture
            }
        }
    }
}
`;

export const GET_PAGINATED_MESSAGES = gql`
query PaginateMessages($limit: Int!, $offset: Int!) {
    PaginateMessages(limit: $limit, offset: $offset){
        hasMore
        rows {
            id
            createdAt
            content
            likes
            user {
                firstName
                lastName
                profilePicture
            }
        }
    }
}
`;

export const NEW_MESSAGE = gql`
mutation addMessage($content: String!, $userId: Int!) {
  addMessage(content: $content, userId: $userId) {
    id
    content
    createdAt
  }
}
`;