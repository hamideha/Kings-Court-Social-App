import { useStore } from '../../store/global-store'

import DefaultProfile from '../../assets/default-profile.png'

const ChatBubble = ({ chat }) => {
    const { currentUser } = useStore()
    const isCurrentUser = chat.user.id === currentUser?.id;

    return (
        <>
            <div className={`flex items-center my-2 w-full ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex flex-shrink-0 items-center justify-center ">
                    <img className="w-6 h-6 rounded-full" src={chat.user.profilePicture || DefaultProfile} alt="Profile" />
                </div>
                <div className={`relative text-xs py-2 px-4 shadow rounded-xl break-all ${isCurrentUser ? "bg-indigo-100 mr-3" : "bg-white ml-3"}`}>
                    {chat.content}
                </div>
            </div>
        </>
    )
}

export default ChatBubble