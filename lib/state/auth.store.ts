import { create } from "zustand"

interface AuthState {
    phone: string
    email: string
    userId: string
    setPhone: (phone: string) => void
    setEmail: (email: string) => void
    setUserId: (userId: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    phone: "",
    email: "",
    userId: "",
    setPhone: (phone: string) => set({ phone }),
    setEmail: (email: string) => set({ email }),
    setUserId: (userId: string) => set({ userId }),
}))