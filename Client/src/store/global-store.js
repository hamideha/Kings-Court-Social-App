import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        currentUser: {},
        setUserOnLogin: (user) => {
            set({ currentUser: user })
        },
        setUserOnLogout: () => set({ currentUser: {} })
    }),
    {
        name: "user-storage"
    }
))