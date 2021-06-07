import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        currentUser: {},
        setCurrentUser: (user) => {
            if (user && user.authUser) {
                delete user.authUser.messages
                set({ currentUser: user })
            }
        },
        // setUserOnLogin: (user) => {
        //     set({ currentUser: user })
        // },
        // setUserOnLogout: () => set({ currentUser: {} })
    }),
    {
        name: "user-storage",
    }
))