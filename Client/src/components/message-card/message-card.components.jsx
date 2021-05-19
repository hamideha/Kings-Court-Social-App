import { useState } from 'react'
import { getFormatted } from '../../utils/dates'

import DefaultProfile from '../../assets/default-profile.png'
import UserPopup from '../user-popup/user-popup.component'
import { HeartIcon } from '@heroicons/react/outline'


const MessageCard = ({ user, message }) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="border border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between w-full">
                    <div className="flex items-center">
                        <UserPopup user={user} >
                            <img className="w-10 h-10 rounded-full" src={user.profilePicture || DefaultProfile} alt="Profile" />
                        </UserPopup>
                        <div className="text-sm">
                            <p className="text-black leading-none font-semibold prose">{user.firstName + ' ' + user.lastName}</p>
                            <p className="text-grey-dark font-light prose">{getFormatted(message.createdAt)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-grey-darker text-base mt-4 break-words">{message.content}</p>
                    </div>
                    <div className="message-functions">
                        <HeartIcon className="h-5 w-5 text-blue-500" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default MessageCard