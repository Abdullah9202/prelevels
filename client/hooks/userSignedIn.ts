import { SignedIn, SignIn } from "@clerk/nextjs";
import { create } from "zustand";


interface UserSignedInState  {
    signedIn : Boolean,
    setSignedIn : (signedIn:boolean) => void
}


export const useSignIn = create<UserSignedInState>((set) =>({
    signedIn : false,
    setSignedIn : (signedIn : boolean) => set({signedIn}),
}))  



