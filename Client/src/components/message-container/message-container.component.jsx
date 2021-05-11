import { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import MessageCard from '../message-card/message-card.components'
import Spinner from '../spinner/spinner.components'
import { detectScrollEnd } from '../../utils/detectScroll'

const GET_PAGINATED_MESSAGES = gql`
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
        <div className="grid grid-cols-1 overflow-y-scroll">
            {data && data.PaginateMessages && data.PaginateMessages.rows.map(message => {
                return <MessageCard key={message.id} message={message} user={message.user} />
            })}
            {data && data.PaginateMessages && data.PaginateMessages.hasMore &&
                <button onClick={async () => {
                    setIsLoadingMore(true)
                    await fetchMore({
                        variables: { offset: data.PaginateMessages.rows.length }
                    })
                    setIsLoadingMore(false)
                }}>
                    Click ME FOR MORE
            </button>
            }
        </div>
    )
}

export default MessageContainer