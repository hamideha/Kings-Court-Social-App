import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { SignInButton, SignOutButton } from '../../auth/auth-buttons.component'
import { useStore } from '../../store/global-store'

import DefaultProfile from '../../assets/default-profile.png'
import Logo from '../../assets/Logo.svg'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { currentUser } = useStore()

    return (
        <div className="bg-gray-800 sticky top-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <Link to="/" className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block h-14 w-auto"
                                src={Logo}
                                alt="Logo"
                            />
                            <p className="hidden sm:block font-bold text-white text-xl mx-2" style={{ fontFamily: 'BN Piedmont' }}>King's Court</p>
                        </div>
                    </Link>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            {({ open }) => (
                                <>
                                    <div>
                                        {currentUser ? <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={currentUser.profilePicture || DefaultProfile}
                                                alt="Profile"
                                            />
                                        </Menu.Button> : <SignInButton />}
                                    </div>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                        )}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                        )}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <SignOutButton
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                        )}
                                                    />
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                        )} to="home">
                                                        Landing
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header