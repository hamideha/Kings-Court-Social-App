import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { useStore } from '../../store/global-store'
import { animateScroll } from 'react-scroll'

import { POST_CHAT } from '../../queries/chat.queries'
import { UPLOAD_FILE } from '../../queries/fileUpload.queries'

import { ChatBox } from '../fields/fields.component'

export const NewChat = ({ subscribeToNewChats }) => {
    useEffect(() => {
        subscribeToNewChats()
    })

    const { currentUser } = useStore()
    const [newChat, setNewChat] = useState('')

    const [addChat, { error }] = useMutation(POST_CHAT)
    const [uploadFileMutation, { loading, data, called }] = useMutation(UPLOAD_FILE);
    const onChange = ({
        target: {
            validity,
            files: [file],
        },
    }) => {
        if (validity.valid) uploadFileMutation({ variables: { file } })
            .then(({ data }) => { setNewChat(data.singleUpload.url) })
    }

    const handleSubmit = () => {
        if (newChat !== '') {
            addChat({ variables: { content: newChat, userId: currentUser?.id } }).then(() => {
                setNewChat('');
                animateScroll.scrollToBottom({
                    containerId: "chat-scroller",
                    isDynamic: true,
                    duration: (scrollDistanceInPx) => { return scrollDistanceInPx / 8 },
                })
            });
        }
    }

    if (error) {
        return <h1>{JSON.stringify(error.message)}</h1>
    }

    return (
        <>
            <ChatBox
                disabledSubmit={newChat === ''}
                disabledInput={loading}
                onClick={handleSubmit}
                value={newChat}
                placeholder={loading ? 'Loading...' : ''}
                onImageUpload={onChange}
                onChange={e => setNewChat(e.target.value)}
            />
        </>
    )
}