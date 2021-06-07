import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        currentUser: {},
        setCurrentUser: (user) => {
            set({ currentUser: user })
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