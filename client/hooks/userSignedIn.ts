import { persist } from "zustand/middleware";
import { create } from "zustand";

interface UserSignedInState {
  signedIn: Boolean;
  setSignedIn: (signedIn: boolean) => void;
}

export const useSignIn = create<UserSignedInState>()(
  persist(
    (set) => ({
      signedIn: false,
      setSignedIn: (signedIn) => set({ signedIn }),
    }),
    {
      name: "is-Login",
      partialize: (state) => ({ signedIn: state.signedIn }),
    }
  )
);

// export const useSignIn = create<UserSignedInState>((set) =>({
//     signedIn : false,
//     setSignedIn : (signedIn : boolean) => set({signedIn}),
// }))
