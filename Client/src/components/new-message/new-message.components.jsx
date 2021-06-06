import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { useStore } from '../../store/global-store'

import { NEW_MESSAGE } from '../../queries/message.queries'

import { AddButton, SubmitModalButton } from '../buttons/buttons.component'
import { TextArea } from '../fields/fields.component'
import ProgressCircle from '../progress/progress.component'
import Modal from '../modal/modal.component'

export const NewMessage = ({ subscribeToNewComments }) => {
    useEffect(() => {
        subscribeToNewComments()
    })

    const { currentUser } = useStore()
    const [addMessage] = useMutation(NEW_MESSAGE)

    const [newMessage, setNewMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = () => {
        addMessage({ variables: { content: newMessage, userId: currentUser?.authUser?.id } });
        setIsOpen(false);
        setNewMessage('');
    }

    return (
        <>
            <div className="">
                <AddButton onClick={() => setIsOpen(true)} />
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New Take">
                <TextArea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} required />
                <div className="flex justify-between items-center">
                    <SubmitModalButton
                        onClick={handleSubmit}
                        disabled={newMessage.length < 1 || newMessage.length > 248}
                    >
                        Submit
                    </SubmitModalButton>
                    <ProgressCircle progress={newMessage.length} maxValue={248} text={`${newMessage.length}/${248}`} />
                </div>
            </Modal>
        </>
    )
}