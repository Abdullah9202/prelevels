"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [nav, setNav] = useState(false);

    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-red-500 mr-4 lg:px-12 lg:pr-52">Prelevel</span>
                        </div>
                        <div className="hidden md:flex space-x-4 lg:items-center lg:justify-center">
                            <Link href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link href="/courses" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                Courses
                            </Link>
                            <Link href="/question-banks" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                Question Banks
                            </Link>
                            <Link href="/bundles" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                Bundle
                            </Link>
                            <Link href="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                            Login
                        </Link>
                        <Link href="/contact" className="bg-red-600 text-white lg:px-5 px-3 py-2 rounded-2xl text-xs md:text-sm font-medium hover:bg-red-700">
                            Create Account
                        </Link>
                    </div>
                    <div
                        onClick={() => setNav(!nav)}
                        className="cursor-pointer md:hidden"
                    >
                        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                    </div>
                </div>
            </div>

            {nav && (
                <div className="md:hidden">
                    <ul className="flex flex-col items-center space-y-4 mt-5">
                        <li>
                            <Link href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/courses" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link href="/question-banks" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Question Banks
                            </Link>
                        </li>
                        <li>
                            <Link href="/bundles" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Bundle
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Contact
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/login" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium" onClick={() => setNav(false)}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700" onClick={() => setNav(false)}>
                                Contact
                            </Link>
                        </li> */}
                    </ul>
                </div>
            )}
        </nav>
    );
}