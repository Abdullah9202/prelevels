import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" py-32 px-4 lg:px-14 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo Section */}
        <div>
          <h2 className="text-red-500 text-xl font-bold mb-4">Prelevels</h2>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-red-500">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-red-500">Market Place</a></li>
            <li><a href="#" className="text-gray-600 hover:text-red-500">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-red-500">Contact Us</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 hover:text-red-500">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-red-500">News and Updates</a></li>
            <li><a href="#" className="text-gray-600 hover:text-red-500">Career</a></li>
          </ul>
        </div>

        {/* Stay Up to Date Section */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Stay up to date</h3>
          <p className="text-gray-600 mb-4">
            We don’t like to brag, but we don’t mind letting our students do it for us. Here are a few nice things folks have said about our service over the years.
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            <FaWhatsapp className="mr-2 text-xs" /> Join WhatsApp Community
          </a>
        </div>
      </div>
    </footer>
  );
}
