import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserState {
  user: any | null;
  setUser: (user: any | null) => void;
}

interface UserState {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// creating the state
// import create from 'zustand';

// interface User {
//   id: number;
//   name: string;
//   // Add other user properties as needed
// }

// interface UserState {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));

//  how to use user after state
// import React from 'react';
// import { useUserStore } from '../store/useUserStore';

// const Profile: React.FC = () => {
//   const user = useUserStore((state) => state.user);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   const nameParts = user.name.split(' ');
//   const first_name = nameParts[0] ? nameParts[0][0] : '';
//   const last_name = nameParts[1] ? nameParts[1][0] : '';

//   return (
//     <span className="flex justify-center items-center w-[80px] h-[80px] bg-blue-500 text-white text-xl rounded-full font-bold">
//       {first_name}
//       {last_name}
//     </span>
//   );
// };

// export default Profile;

// how to set user
// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import { useEffect } from 'react';
// import { useUserStore } from '../store/useUserStore';

// function MyApp({ Component, pageProps }: AppProps) {
//   const setUser = useUserStore((state) => state.setUser);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/user/profile/'); // AZAK
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [setUser]);

//   return <Component {...pageProps} />;
// }

// export default MyApp;

// how to use this with persist

// import { useUser } from "../hooks/useUser";

// const fetchUserData = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/user/profile/'); // AZAK
//     const data = await response.json();
//     useUser.getState().setUser(data); // Store user data
//   } catch (error) {
//     console.error("Failed to fetch user data:", error);
//   }
// };
