import { useMutation, useQuery } from '@apollo/client';
import { getFormatted } from '../../utils/dates'
import { useStore } from '../../store/global-store'

import { POST_LIKE, GET_IS_MESSAGE_LIKED_BY_USER } from '../../queries/likes.queries'

import LikeButton from '../like-post/like-post.component'
import DefaultProfile from '../../assets/default-profile.png'
import UserPopup from '../user-popup/user-popup.component'

const MessageCard = ({ user, message }) => {
    const { currentUser } = useStore()

    const { data, refetch } = useQuery(GET_IS_MESSAGE_LIKED_BY_USER, { variables: { userId: currentUser?.id, messageId: message.id } });

    const [addLike, res] = useMutation(POST_LIKE)
    const handleLike = () => {
        addLike({
            variables: { messageId: message.id, userId: currentUser?.id },
            optimisticResponse: {
                likeMessage: {
                    __typename: 'Message',
                    likes: res.data?.messageLikes?.likes
                }
            }
        }).then(() => refetch())
    }

    return (
        <>
            <div className="flex justify-center flex-col m-1 p-4 shadow-lg border border-grey-light bg-white break-words">
                <div className="flex items-center">
                    <UserPopup user={user}>
                        <img className="w-10 h-10 rounded-full select-none" src={user.profilePicture || DefaultProfile} alt="Profile" />
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
                    <LikeButton onClick={handleLike} likes={message.likes}
                        isLikedByUser={data?.isMessageLikedByUser}
                    />
                </div>

            </div>
        </>
    )
}
export default MessageCard