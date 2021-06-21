import { useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'

import { Upload } from 'react-feather'

const FilePopup = ({ children }) => {
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement: 'top-end',
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 10] },
            },
        ],
    })

    const onChange = (e) => {
        console.log(e)
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button ref={setReferenceElement} onClick={(e) => { update() }} className="h-full focus:outline-none">
                        {children}
                    </Popover.Button>
                    <Transition show={open}>
                        <Transition.Child
                            as={'div'}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="z-50 overflow-hidden h-40 p-2 rounded-lg shadow-lg bg-white flex"
                                ref={setPopperElement}
                                style={{ width: '19rem', ...styles.popper }}
                                {...attributes.popper}
                            >
                                <div className="flex relative items-center self-end bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90 text-white leading-none font-semibold prose p-2 rounded-lg shadow-lg cursor-pointer">
                                    <input type="file" className="absolute top-0 left-0 opacity-0" required onChange={onChange} />
                                    <Upload className="mr-2 text-white" />
                                    Upload files
                                </div>
                            </Popover.Panel>
                        </Transition.Child>
                    </Transition>
                </>
            )
            }
        </Popover >
    )
}

export default FilePopup