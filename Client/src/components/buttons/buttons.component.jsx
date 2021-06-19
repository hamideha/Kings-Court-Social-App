import { HeartIcon } from '@heroicons/react/outline'

export const AddButton = ({ onClick }) => {
    return (
        <button
            className="p-0 w-16 h-16 bg-indigo-600 rounded-full hover:bg-indigo-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none fixed bottom-0 right-0 mt-6 mb-6 mr-6"
            onClick={onClick}>
            <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z" />
            </svg>
        </button>
    )
}

export const SubmitModalButton = ({ onClick, children, disabled }) => {
    return (
        <button
            className="disabled:opacity-50 inline-flex justify-center mt-4 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export const LikeButton = ({ onClick }) => {
    return (
        <div className="h-7 w-7 rounded-full flex flex-row justify-center items-center hover:bg-blue-100" onClick={onClick}>
            <HeartIcon className="h-5 w-5 text-blue-600" />
        </div>
    )
}