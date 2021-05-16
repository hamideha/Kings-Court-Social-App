import create from 'zustand'

export const useStore = create(set => ({
    user: {},
    login: (user) => set({ user: user }),
    logout: () => set({ user: {} })
}))