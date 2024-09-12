"use client"
import React from 'react';
import { FaHome, FaBook, FaQuestion, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6 text-2xl font-semibold text-red-600 flex items-center ">
        Prelevels
        <button className='px-6' onClick={()=> router.push('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
            </svg>
        </button>
        
      </div>
      <nav className="mt-6 px-5 space-y-4">
        <a href="#" className="flex items-center p-2 hover:bg-gray-100">
          <FaHome size={20} className="mr-3" /> Home
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100">
          <FaBook size={20} className="mr-3" /> Courses
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100">
          <FaQuestion size={20} className="mr-3" /> Question Banks
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100">
          <FaChartBar size={20} className="mr-3" /> Statistics
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-gray-100">
          <FaSignOutAlt size={20} className="mr-3" /> Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
