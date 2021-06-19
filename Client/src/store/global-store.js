import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist(
    set => ({
        currentUser: {},
        setCurrentUser: async (user) => {
            if (user) {
                const loadedUser = await user
                await set({ currentUser: loadedUser })
            } else {
                set({ currentUser: undefined })
            }
        }
    }),
    {
        name: "user-storage",
    }
))