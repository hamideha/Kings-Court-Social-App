import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { detectBottomScroll } from '../../utils/detectScroll'

import MessageCard from '../message-card/message-card.components'
import Spinner from '../spinner/spinner.components'

import { GET_PAGINATED_MESSAGES } from '../../queries/message.queries'

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
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-scroll" onScroll={(e) => detectBottomScroll(e,
                async () => {
                    setIsLoadingMore(true)
                    await fetchMore({
                        variables: { offset: data.PaginateMessages.rows.length }
                    })
                    setIsLoadingMore(false)
                }
            )}>
                {data && data.PaginateMessages && data.PaginateMessages.rows.map(message => {
                    return <MessageCard key={message.id} message={message} user={message.user} />
                })}
            </div>
        </div >
    )
}

export default MessageContainer