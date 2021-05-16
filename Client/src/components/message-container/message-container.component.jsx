import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { detectBottomScroll } from '../../utils/detectScroll'

import MessageCard from '../message-card/message-card.components'
import { NewMessage } from '../new-message/new-message.components'
import Spinner from '../spinner/spinner.components'

import { GET_PAGINATED_MESSAGES, SUBSCRIBE_NEW_MESSAGE } from '../../queries/message.queries'

const MessageContainer = () => {
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const { loading, data, fetchMore, subscribeToMore } = useQuery(GET_PAGINATED_MESSAGES, {
        variables: {
            offset: 0,
            limit: 10
        },
    });

    if (loading) {
        return (
            <>
                <Spinner />
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
                <NewMessage
                    subscribeToNewComments={() =>
                        subscribeToMore({
                            document: SUBSCRIBE_NEW_MESSAGE,
                            variables: { offset: data?.PaginateMessages.rows.length, limit: 10 },
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const newMessage = subscriptionData.data.messageAdded;
                                const exists = prev.PaginateMessages.rows.find(
                                    ({ id }) => id === newMessage.id
                                );
                                if (exists) return prev;

                                return Object.assign({}, prev, { newField: true }, {
                                    PaginateMessages: {
                                        rows: [newMessage],
                                        hasMore: prev.PaginateMessages.hasMore,
                                    }
                                });
                            }
                        })
                    }
                />
            </div>
        </div >
    )
}

export default MessageContainer