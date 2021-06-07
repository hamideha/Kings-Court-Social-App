import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { useStore } from '../../store/global-store'

import { POST_CHAT } from '../../queries/chat.queries'

import { ChatBox } from '../fields/fields.component'

export const NewChat = ({ subscribeToNewChats }) => {
    useEffect(() => {
        subscribeToNewChats()
    })

    const { currentUser } = useStore()
    const [addChat, { error }] = useMutation(POST_CHAT)
    const [newChat, setNewChat] = useState('')

    const handleSubmit = () => {
        addChat({ variables: { content: newChat, userId: currentUser?.authUser?.id } });
        setNewChat('');
    }

    if (error) {
        return <h1>{JSON.stringify(error.message)}</h1>
    }

    return (
        <>
            <ChatBox
                onClick={handleSubmit}
                value={newChat}
                onChange={e => setNewChat(e.target.value)}
            />
        </>
    )
}