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