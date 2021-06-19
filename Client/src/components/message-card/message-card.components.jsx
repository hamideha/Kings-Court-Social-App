import { getFormatted } from '../../utils/dates'

import DefaultProfile from '../../assets/default-profile.png'
import UserPopup from '../user-popup/user-popup.component'
import { HeartIcon } from '@heroicons/react/outline'


const MessageCard = ({ user, message }) => {
    return (
        <>
            <div className="flex justify-center flex-col m-1 p-4 shadow-lg border border-grey-light bg-white break-words">
                <div className="flex items-center">
                    <UserPopup user={user}>
                        <img className="w-10 h-10 rounded-full" src={user.profilePicture || DefaultProfile} alt="Profile" />
                    </UserPopup>
                    <div className="text-sm">
                        <p className="text-black leading-none font-semibold prose">{user.firstName + ' ' + user.lastName}</p>
                        <p className="text-grey-dark font-light prose">{getFormatted(message.createdAt)}</p>
                    </div>
                </div>
                <div>
                    <p className="text-grey-darker mt-4" style={{ fontSize: '14px' }}>{message.content}</p>
                </div>
                <div className="message-functions flex flex-row">
                    <div className="h-7 w-7 rounded-full flex flex-row justify-center items-center hover:bg-blue-100">
                        <HeartIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-grey-dark font-light prose flex items-center px-1">{message.likes}</p>
                </div>

            </div>
        </>
    )
}
export default MessageCard