import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';



export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30 md:relative md:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-semibold">Menu</h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiX className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <a href="#" className="block p-2 rounded hover:bg-gray-700">Home</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">About</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">Services</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">Contact</a>
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
