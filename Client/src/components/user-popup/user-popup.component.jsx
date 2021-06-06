import { useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { getFormattedDate } from '../../utils/dates'

import DefaultProfile from '../../assets/default-profile.png'

const UserPopup = ({ user, children }) => {
    const [isHovered, setIsHovered] = useState(false)
    const onEnter = (e) => {
        setIsHovered(!isHovered)
    }

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement: 'right',
    })

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button ref={setReferenceElement} className="mr-4 z-30 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-700" onClick={(e) => { update() }}>
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
                                className="z-50 w-screen max-w-sm px-4"
                                ref={setPopperElement}
                                style={styles.popper}
                                {...attributes.popper}
                            >
                                <div className="overflow-hidden rounded-lg shadow-lg bg-gray-800 p-4 flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-4" src={user.profilePicture || DefaultProfile} alt="Profile" />
                                    <div className="text-sm">
                                        <p className="text-white leading-none font-semibold prose"
                                            onMouseEnter={onEnter} onMouseLeave={onEnter}
                                        >
                                            {isHovered ? user.email : user.firstName + ' ' + user.lastName}
                                        </p>
                                        <p className="text-white text-sm font-light prose">User since {getFormattedDate(user.createdAt)}</p>
                                    </div>
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

export default UserPopup