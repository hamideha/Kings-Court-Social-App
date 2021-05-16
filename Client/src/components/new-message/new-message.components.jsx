import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { NEW_MESSAGE } from '../../queries/message.queries'
import { useStore } from '../../store/global-store'

import { AddButton, SubmitModalButton } from '../buttons/buttons.component'
import { TextArea } from '../fields/fields.component'
import Modal from '../modal/modal.component'

export const NewMessage = ({ subscribeToNewComments }) => {
    useEffect(() => {
        subscribeToNewComments()
    })

    const { currentUser } = useStore()
    const [addMessage, { data, loading, error }] = useMutation(NEW_MESSAGE)

    const [newMessage, setNewMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = () => {
        addMessage({ variables: { content: newMessage, userId: currentUser.authUser.id } });
        setIsOpen(false);
        setNewMessage('');
    }

    return (
        <>
            <div className="">
                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New Take">
                <form>
                    <TextArea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} required />
                    <SubmitModalButton
                        onClick={handleSubmit}
                        disabled={newMessage.length < 1}
                    >
                        Submit
                    </SubmitModalButton>
                </form>
            </Modal>
        </>
    )
}