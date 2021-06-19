import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        userLoadingState: true,
        currentUser: {},
        setCurrentUser: async (user) => {
            if (user) {
                const loadedUser = await user
                set({ currentUser: loadedUser })
            } else {
                set({ currentUser: undefined, userLoadingState: false })
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