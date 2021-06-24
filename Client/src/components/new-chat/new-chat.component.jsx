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
    const [previewImg, setPreviewImg] = useState('')
    const [uploadFile, setFile] = useState()
    const [newChat, setNewChat] = useState('')

    const [addChat, { error }] = useMutation(POST_CHAT)
    const [uploadFileMutation, { loading }] = useMutation(UPLOAD_FILE);
    const onChange = ({
        target: {
            validity,
            files: [file],
        },
    }) => {
        if (validity.valid) {
            setPreviewImg(URL.createObjectURL(file))
            setFile(file)
        }
    }

    const submitChat = (content) => {
        addChat({ variables: { content, userId: currentUser?.id } })
            .then(() => {
                setNewChat('');
                animateScroll.scrollToBottom({
                    containerId: "chat-scroller",
                    isDynamic: true,
                    duration: (scrollDistanceInPx) => { return scrollDistanceInPx / 8 },
                })
                return
            });
    }

    const handleSubmit = () => {
        if (previewImg) {
            setPreviewImg('')
            uploadFileMutation({ variables: { file: uploadFile } })
                .then(({ data }) => { submitChat(data.singleUpload.url) })
        } else {
            submitChat(newChat)
        }
    }

    if (error) {
        return <h1>{JSON.stringify(error.message)}</h1>
    }

    return (
        <>
            <ChatBox
                disabledSubmit={!newChat && !previewImg}
                disabledInput={loading}
                onClick={handleSubmit}
                previewImg={previewImg}
                setPreviewImg={setPreviewImg}
                onImageUpload={onChange}
                value={newChat}
                placeholder={loading ? 'Loading...' : ''}
                onChange={e => setNewChat(e.target.value)}
            />
        </>
    )
}