import { useQuery } from '@apollo/client';

import { NewChat } from '../new-chat/new-chat.component'
import ChatBubble from '../chat-bubble/chat-bubble.component'

import { GET_CHATS, SUBSCRIBE_NEW_CHAT } from '../../queries/chat.queries'

const ChatContainer = () => {
    const { data, subscribeToMore } = useQuery(GET_CHATS);

    return (
        <>
            <div className="hidden md:block w-80 bg-gray-800">
                <div className="h-full overflow-y-auto pb-14 px-3" id="chat-scroller">
                    <h1 className="text-white" style={{ fontFamily: 'SFProDisplay', fontWeight: 'bold', fontSize: '28px' }}>Chat</h1>
                    {data && data.chats && data.chats.map((chat, idx) => {
                        return (
                            <ChatBubble key={idx} chat={chat} />
                        )
                    })}
                </div>
                <div className="sticky bottom-0 left-0 w-full bg-white m-auto bg-gray-800 border-t-2 border-gray-600">
                    <NewChat
                        subscribeToNewChats={() =>
                            subscribeToMore({
                                document: SUBSCRIBE_NEW_CHAT,
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;
                                    const newChat = subscriptionData.data.chatSent;
                                    const exists = prev.chats.find(
                                        ({ id }) => id === newChat.id
                                    );
                                    if (exists) return prev;

                                    return Object.assign({}, prev, {
                                        chats: [...prev.chats, newChat]
                                    });
                                }
                            })}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatContainer