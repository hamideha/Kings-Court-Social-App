import { useState } from 'react'
import { useStore } from '../../store/global-store'
import * as isURL from 'is-url'
import { IsImage } from '../../utils/isImage'

import DefaultProfile from '../../assets/default-profile.png'

const ChatBubble = ({ chat }) => {
    const { currentUser } = useStore()
    const isCurrentUser = chat.user.id === currentUser?.id;

    const [isImage, setIsImage] = useState(false)
    if (isURL(chat.content)) IsImage(chat.content)
        .then(() => setIsImage(true))
        .catch(() => setIsImage(false))

    return (
        <>
            <div className={`flex items-center my-2 w-full ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex flex-shrink-0 items-center justify-center ">
                    <img className="w-6 h-6 rounded-full" src={chat.user.profilePicture || DefaultProfile} alt="Profile" />
                </div>
                <div className={`relative text-xs py-2 px-4 shadow rounded-xl break-all ${isCurrentUser ? "bg-indigo-100 mr-3" : "bg-white ml-3"}`}>
                    {isImage ? <img src={chat.content} alt={"Chat"} className="rounded-xl"/> : chat.content}
                </div>
            </div>
        </>
    )
}

export default ChatBubble