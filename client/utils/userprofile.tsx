"use client"
import React, { useState } from "react";
import { FaUser,FaSignOutAlt,  } from "react-icons/fa";



const Profile = ({name } : {name : string}) => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const nameParts = name.split(" ");
    const first_name = nameParts[0] ? nameParts[0][0] : ""
    const last_name = nameParts[1]? nameParts[1][0] : ""

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    return (
        <div>
            <button onClick={toggleMenu} className="flex justify-center items-center w-44 h-44 bg-blue-500 text-white text-base p-2 rounded-full font-bold">
                {first_name}
                {last_name}
            </button>

            { isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-600 w-40 border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                        <li className="px-4 py-2 flex items-center">
                        <span className="mr-2">👨‍💻</span>
                            <button className="w-full text-left hover:bg-gray-400 cursor-pointer"> Profile</button>
                        </li>
                        <li className="px-4 py-2 flex items-center">
                            <span className="mr-2">⚙️</span>
                            <button className="w-full text-left hover:bg-gray-400 cursor-pointer">Settings</button>
                        </li>
                        <li className="px-4 py-2 flex items-center">
                            <span className="mr-2">🚪</span>
                            <button className="w-full text-left hover:bg-gray-400 cursor-pointer">Logout</button>
                        </li>
                    </ul>
                </div>
            )

            }
        </div>
    )
}

export default Profile