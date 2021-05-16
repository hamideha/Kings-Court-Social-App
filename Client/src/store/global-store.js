import create from 'zustand'

export const useStore = create(set => ({
    currentUser: {},
    setUserOnLogin: (user) => {
        set({ currentUser: user })
    },
    setUserOnLogout: () => set({ currentUser: {} })
}))