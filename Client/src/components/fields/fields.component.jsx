import { PaperAirplaneIcon } from '@heroicons/react/solid'
import { PaperClipIcon } from '@heroicons/react/outline'

export const TextArea = ({ value, required, onChange }) => {
    return (
        <textarea className="w-full h-52 resize-none mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required={required}
            value={value} onChange={onChange}
        />
    )
}

export const ChatBox = ({ value, onChange, onClick }) => {
    return (
        <div className="flex flex-row justify-center items-center w-full py-3">
            <div className="w-11/12 flex ml-2">
                <span className="flex items-center bg-white rounded-xl rounded-r-none px-2 hover:bg-blue-100">
                    <PaperClipIcon className="w-5 text-blue-600 m-auto" />
                </span>
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    className="flex w-11/12 border-gray-300 rounded-xl rounded-l-none focus:outline-none focus:border-indigo-300 h-8 m-auto"
                />
            </div>
            <button onClick={onClick} type="submit" className="h-8 w-8 mx-1 rounded-full flex justify-center items-center hover:bg-blue-100 focus:outline-none">
                <PaperAirplaneIcon className="w-5 text-blue-600 m-auto" />
            </button>
        </div>
    )
}