const ChatBubble = ({ content, user }) => {
    return (
        <>
            <div className="flex flex-row items-center my-2 w-full">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                </div>
                <div className="relative ml-3 text-xs text-black bg-white py-2 px-4 shadow rounded-xl">
                    <div>{Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 33)} Hey How are you today?</div>
                </div>
            </div>
        </>
    )
}

export default ChatBubble