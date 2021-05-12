import { gql } from '@apollo/client';

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