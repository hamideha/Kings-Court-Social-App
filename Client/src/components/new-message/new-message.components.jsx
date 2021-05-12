import { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { NEW_MESSAGE } from '../../queries/message.queries'

import Modal from '../modal/modal.component'

export const NewMessage = () => {
    const [addMessage, { data, loading, error }] = useMutation(NEW_MESSAGE, {
        update(cache, { data: { addMessage } }) {
            cache.modify({
                fields: {
                    PaginateMessages({ rows }) {
                        console.log(rows)
                        const newMessageRef = cache.writeFragment({
                            data: addMessage,
                            fragment: gql`
                                fragment NewMessage on Message {
                                    id
                                    content
                                    createdAt
                                }`
                        });
                        console.log([...rows, newMessageRef])
                        return [...rows, newMessageRef];
                    }
                }
            });
        }
    });
    console.log(data, loading, error)
    const [newMessage, setNewMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = () => {
        addMessage({ variables: { content: newMessage, userId: 8 } });
        setIsOpen(false);
        setNewMessage('');
    }

    return (
        <>
            <div className="">
                <button
                    className="p-0 w-16 h-16 bg-indigo-600 rounded-full hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none fixed bottom-0 right-0 mt-6 mb-6 mr-6"
                    onClick={() => setIsOpen(true)}>
                    <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z" />
                    </svg>
                </button>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="New Take">
                <div className="mt-4">
                    <textarea className="w-full h-52 resize-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    )
}