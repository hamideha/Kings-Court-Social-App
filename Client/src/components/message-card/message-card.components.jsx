import DefaultProfile from '../../assets/default-profile.png'

import { getFormatted } from '../../utils/dates'

const MessageCard = ({ user, message }) => {
    return (
        <>
            <div className="flex justify-center">
                <div className="border border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between w-full">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={user.profilePicture || DefaultProfile} alt="Profile" />
                        <div className="text-sm">
                            <p className="text-black leading-none">{user.firstName + ' ' + user.lastName}</p>
                            <p className="text-grey-dark">{getFormatted(message.createdAt)}</p>
                        </div>
                    </div>
                    <p className="text-grey-darker text-base mt-4">{message.content}</p>
                </div>
            </div>
        </>
    )
}
export default MessageCard