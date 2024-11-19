import { create } from "zustand";
import Cookies from "js-cookie";

interface PasswordState {
  password: string | null; // Password state (null if not set)
  setPassword: (password: string) => void; // Function to set password
  clearPassword: () => void; // Function to clear password
}

export const usePasswordStore = create<PasswordState>((set) => ({
  password: Cookies.get("user-password") || null, // Initialize from cookies
  setPassword: (password: string) => {
    Cookies.set("user-password", password, { expires: 7, secure: true, sameSite: "strict" }); // Store in cookies
    set({ password });
  },
  clearPassword: () => {
    Cookies.remove("user-password"); // Remove the password cookie
    set({ password: null });
  },
}));
