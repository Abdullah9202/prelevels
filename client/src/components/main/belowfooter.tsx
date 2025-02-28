import React from "react";

export default function Belowfooter() {
  return (
    <section className="px-24 pb-7 bg-[#D9D9D9]">
      {/* Horizontal Line */}
      <hr className="border-gray-400 w-full mb-6" />

      {/* Footer Content */}
      <div className="flex items-center justify-between">
        {/* Left Side: Copyright Icon and Text */}
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="black"
            className="bi bi-c-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503" />
          </svg>
          <span className="text-gray-600">
            2024 Prelevels. All rights reserved.
          </span>
        </div>

        {/* Right Side: Privacy Policy and Terms */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-red-500">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-red-500">
            Terms & Conditions
          </a>
        </div>
      </div>
    </section>
  );
}
