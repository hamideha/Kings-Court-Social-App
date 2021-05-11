import { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import MessageCard from '../message-card/message-card.components'
import Spinner from '../spinner/spinner.components'

const GET_PAGINATED_MESSAGES = gql`
query PaginateMessages($limit: Int!, $offset: Int!) {
    PaginateMessages(limit: $limit, offset: $offset){
    id
    createdAt
    content
    likes
    user {
        firstName
        lastName
        profilePicture
    }}
  }
`;

const MessageContainer = () => {
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const { loading, data, fetchMore } = useQuery(GET_PAGINATED_MESSAGES, {
        variables: {
            offset: 0,
            limit: 10
        },
    });

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            {data && data.PaginateMessages.map(message => {
                return <MessageCard key={message.id} message={message} user={message.user} />
            })}
            <button onClick={async () => {
                setIsLoadingMore(true)
                await fetchMore({
                    variables: { offset: data.PaginateMessages.length }
                })
                setIsLoadingMore(false)
            }}>
                Click ME FOR MORE
            </button>
        </>
    )
}

export default MessageContainer