import { create } from "zustand"

interface AuthState {
    phone: string
    email: string
    setPhone: (phone: string) => void
    setEmail: (email: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    phone: "",
    email: "",
    setPhone: (phone: string) => set({ phone }),
    setEmail: (email: string) => set({ email }),
}))