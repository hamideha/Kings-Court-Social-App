import { gql, useQuery } from '@apollo/client';
import MessageCard from '../message-card/message-card.components'
import Spinner from '../spinner/spinner.components'

const GET_MESSAGES = gql`
  query Messages {
    Messages{
    id
    createdAt
    content
    likes
    user {
        firstName
        lastName
        profilePicture
        }
    }
  }
`;

const MessageContainer = () => {
    const { loading, data } = useQuery(GET_MESSAGES);

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            {data && data.Messages.map(message => {
                return <MessageCard key={message.id} message={message} user={message.user} />
            })}
        </>
    )
}

export default MessageContainer