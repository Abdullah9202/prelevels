import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-10 py-20 px-4 lg:px-14 bg-[#D9D9D9]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
        {/* Logo Section */}
        <div>
          <h2 className="text-red-500 text-xl font-bold mb-4">Prelevels</h2>
          <p className="text-gray-600 text-sm md:text-base">
            Prelevels offers a wide range of courses, question banks, and bundles to help you achieve your goals.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:px-11 lg:px-11">
          <h3 className="text-gray-800 font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Market Place
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                News and Updates
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-4">Stay up to date</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-red-500 text-sm md:text-base">
                Live Chat
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <a
              href="https://wa.me/yourwhatsappnumber"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-5 rounded-3xl md:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}