import { Popover } from '@headlessui/react'
import { X } from 'react-feather';

const FilePopup = ({ imagePreviewUrl, clearImage }) => {
    return (
        <Popover className="relative">
            {imagePreviewUrl && (
                <Popover.Panel
                    className="z-50 h-auto p-2 rounded-lg shadow-lg bg-white grid grid-cols-12 gap-1"
                    style={{ width: '17rem' }}
                    static
                >
                    <img src={imagePreviewUrl} alt="preview" className="rounded-lg col-span-11" />
                    <button onClick={clearImage} className="self-start col-span-1 hover:opacity-70"><X /></button>
                </Popover.Panel>
            )}
        </Popover >
    )
}

export default FilePopup