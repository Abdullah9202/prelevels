"use client";
import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../hooks/useUser";
import { useSignIn } from "../hooks/userSignedIn";

const Profile = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const data = useUser((state) => state.user);

  const firstInitial = data?.first_name[0] || "";
  const lastInitial = data?.last_name[0] || "";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };



  const handleLogoutRequest = async () => {
    const res = await fetch('127.0.0.1:8000/api/customuser/logout/', {
      method : 'POST',
      headers: {"Content-Type": "application/json"},
      credentials: 'include'
    });
    useUser.getState().setUser(null);
    useSignIn.getState().setSignedIn(false);
    const data = await res.json()
    if (data.status === 200){
      
    }

  }

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="flex justify-center items-center w-44 h-44 bg-blue-500 text-white text-base p-2 rounded-full font-bold"
      >
        {firstInitial}
        {lastInitial}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white w-40 border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="py-1">
            <li className="px-4 py-2 flex items-center">
              <span className="mr-2">👨‍💻</span>
              <button className="w-full text-left hover:bg-gray-400 cursor-pointer">
                {" "}
                Profile
              </button>
            </li>
            <li className="px-4 py-2 flex items-center">
              <span className="mr-2">⚙️</span>
              <button className="w-full text-left hover:bg-gray-400 cursor-pointer">
                Settings
              </button>
            </li>
            <li className="px-4 py-2 flex items-center">
              <span className="mr-2">🚪</span>
              <button
                onClick={handleLogoutRequest}
                className="w-full text-left hover:bg-gray-400 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
