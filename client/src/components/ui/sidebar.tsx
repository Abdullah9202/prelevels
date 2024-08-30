"use client";
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import { FaBook,FaInfoCircle } from 'react-icons/fa';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0 shadow-lg`}
      >
        {/* Close Button for Mobile */}
        <div className="p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-semibold">Menu</h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiX className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <a href="#" className="flex items-center p-2 rounded bg-gray-200">
            <FaBook className="w-5 h-5 text-red-600" />
            <span className="ml-2 text-red-600 font-semibold">ETA</span>
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-gray-100">
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">NMDCAT</span>
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-gray-100">
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">GAT</span>
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-gray-100">
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">LUMS</span>
          </a>
          <a href="#" className="flex items-center p-2 rounded hover:bg-gray-100">
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">NUST</span>
          </a>
        </div>

        {/* Help Section */}
        <div className="p-4 mt-auto">
          <div className="flex items-center p-4 rounded bg-gray-100">
            <FaInfoCircle size={30} className="w-6 h-6 text-green-600" />
            <div className="ml-2">
              <h3 className="text-md font-semibold">Need help?</h3>
              <p className="text-sm">Dont know how to use <a href="#" className="text-red-500 underline">click here</a> to see the guide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 text-white p-4 md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4">
          <h1 className="text-2xl font-semibold">Responsive Sidebar</h1>
          <p className="mt-2">This is the main content area.</p>
        </main>
      </div>
    </div>
  );
}
