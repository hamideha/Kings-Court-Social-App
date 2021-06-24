import { useRef } from 'react'
import { Send, Paperclip } from 'react-feather';

import FilePopup from '../file-preview/file-preview.component';

export const TextArea = ({ value, required, onChange }) => {
    return (
        <textarea className="w-full h-52 resize-none mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required={required}
            value={value} onChange={onChange}
        />
    )
}

export const ChatBox = ({
    value,
    previewImg,
    setPreviewImg,
    placeholder,
    onClick,
    disabledSubmit,
    disabledInput,
    onImageUpload,
    onChange
}) => {
    const inputRef = useRef(null)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && document.activeElement === inputRef.current) {
            onClick()
        }
    }

    return (
        <div className="flex flex-row justify-center items-center w-full py-3">
            <div className="w-11/12 flex ml-2">
                {previewImg ?
                    <FilePopup imagePreviewUrl={previewImg} clearImage={() => setPreviewImg('')} /> :
                    <>
                        <div className="flex items-center justify-end self-start px-2 rounded-xl rounded-r-none shadow-lg bg-white hover:bg-blue-100 h-8">
                            <input type="file" accept="image/*" className="absolute top-0 left-0 opacity-0 w-2/12 h-full" required onChange={onImageUpload} />
                            <Paperclip className="w-5 text-blue-600 m-auto self-center" />
                        </div>

                        <input
                            ref={inputRef}
                            value={value}
                            placeholder={placeholder}
                            disabled={disabledInput}
                            onChange={onChange}
                            onKeyUp={handleKeyDown}
                            type="text"
                            className="flex w-11/12 border-gray-300 rounded-xl rounded-l-none focus:outline-none focus:border-indigo-300 h-8 m-auto"
                        />
                    </>
                }
            </div>
            <button onClick={onClick} type="submit" className={`h-8 w-8 mx-1 rounded-full flex justify-center items-center focus:outline-none disabled:opacity-50 ${disabledSubmit ? "cursor-default" : "hover:bg-blue-100"}`} disabled={disabledSubmit}>
                <Send className="w-5 text-blue-600 m-auto" />
            </button>
        </div>
    )
}