import { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client';
import { detectBottomScroll } from '../../utils/detectScroll'

import MessageCard from '../message-card/message-card.components'
import { NewMessage } from '../new-message/new-message.components'
import Spinner from '../spinner/spinner.components'

import { GET_PAGINATED_MESSAGES, SUBSCRIBE_PAGINATED_MESSAGES } from '../../queries/message.queries'

const MessageContainer = () => {
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const { loading, data, fetchMore } = useQuery(GET_PAGINATED_MESSAGES, {
        variables: {
            offset: 0,
            limit: 10
        },
    });

    if (loading) {
        return (
            <>
                <Spinner />
                <NewMessage />
            </>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto" onScroll={(e) => detectBottomScroll(e,
                async () => {
                    setIsLoadingMore(true)
                    await fetchMore({
                        variables: { offset: data.PaginateMessages.rows.length }
                    })
                    setIsLoadingMore(false)
                }
            )}>
                {data && data.PaginateMessages && data.PaginateMessages.rows.map((message, idx) => {
                    return (
                        <MessageCard key={idx} message={message} user={message.user} />
                    )
                })}
                {isLoadingMore && <Spinner />}
                <NewMessage />
            </div>
        </div >
    )
}

export default MessageContainer