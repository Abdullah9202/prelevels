"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import TestImage from "@/assets/Banner.png";
import Image from "next/image";
import { FaBook, FaInfoCircle } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pricingData = [
    {
      id: 1,
      title: "Complete Physiology Test",
      price: "Rs. 100",
      originalPrice: "Rs. 500",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 2,
      title: "Complete Cardiology Test",
      price: "Rs. 250",
      originalPrice: "Rs. 700",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 3,
      title: "Complete Pathology Test",
      price: "Rs. 300",
      originalPrice: "Rs. 500",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 4,
      title: "Complete Neurology Test",
      price: "Rs. 150",
      originalPrice: "Rs. 600",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 5,
      title: "Complete Immunology Test",
      price: "Rs. 350",
      originalPrice: "Rs. 800",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    {
      id: 6,
      title: "Complete Dermatology Test",
      price: "Rs. 200",
      originalPrice: "Rs. 450",
      validTill: "Valid Till 02/2025",
      image: TestImage,
    },
    // Add more items as needed
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(pricingData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = pricingData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-100"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">NMDCAT</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-100"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">GAT</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-100"
          >
            <FaBook className="w-5 h-5 text-gray-800" />
            <span className="ml-2">LUMS</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-100"
          >
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
              <p className="text-sm">
                Dont know how to use?{" "}
                <a href="#" className="text-red-500 underline">
                  Click here
                </a>{" "}
                to see the guide.
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-500 text-white text-sm px-2 py-1 rounded">
                    Best Value
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">Prelevels</p>
                  <p className="text-gray-500 mb-2">{item.validTill}</p>
                  <div className="text-red-500 text-3xl font-bold">
                    {item.price}
                  </div>
                  <div className="text-gray-500 line-through text-xl">
                    {item.originalPrice}
                  </div>
                  <button className="mt-4 w-full bg-neutral border-red-500 border text-red-500 py-2 rounded-3xl">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              } bg-red-500 text-white px-4 py-2 rounded-full`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } bg-red-500 text-white px-4 py-2 rounded-full`}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
