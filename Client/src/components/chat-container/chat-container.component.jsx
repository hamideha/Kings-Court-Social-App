import ScrollContainer from 'react-indiana-drag-scroll'

import { PaperAirplaneIcon } from '@heroicons/react/solid'

import ChatBubble from '../chat-bubble/chat-bubble.component'

const hello = new Array(60).fill(0)

const ChatContainer = () => {
    return (
        <>
            <div className="hidden md:block w-80 bg-gray-800">
                <ScrollContainer activationDistance={5} hideScrollbars={false} className="h-full overflow-y-auto scrollbar-hide pb-14 px-3">
                    <h1 className="text-white" style={{ fontFamily: 'SFProDisplay', fontWeight: 'bold', fontSize: '28px' }}>Chat</h1>
                    {hello.map((el, idx) => {
                        return (
                            <ChatBubble key={idx} />
                        )
                    })}
                </ScrollContainer>
                <div className="sticky bottom-1 left-0 w-11/12 bg-white m-auto py-2 rounded-xl">
                    <div className="flex flex-row w-full">
                        <input
                            type="text"
                            className="flex w-11/12 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-300 ml-2 h-8 m-auto"
                        />
                        <button className="h-8 w-8 mx-1 rounded-full flex justify-center items-center hover:bg-blue-100 focus:outline-none">
                            <PaperAirplaneIcon className="w-5 text-blue-600 m-auto" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatContainer