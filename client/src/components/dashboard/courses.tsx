import React from "react";
import { FaGoogleDrive, FaWhatsapp } from "react-icons/fa";

const Courses = () => {
  return (
    <div className="mt-8 bg-[#D9D9D9] border-2 border-white p-6 shadow-md rounded-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        <CourseCard
          title="Complete Physiology Test"
          status="By Prelevels"
          validation="Valid Till 02/2025"
          btnText="Join Meeting"
          Resources="Resources"
        />
        <CourseCard
          title="Complete Cardiology Test"
          status="By Prelevels"
          validation="Valid Till 02/2025"
          btnText="Join Meeting"
          Resources="Resources"
        />
        <CourseCard
          title="Complete Pathology Test"
          status="By Prelevels"
          validation="Valid Till 02/2025"
          btnText="Join Meeting"
          Resources="Resources"
        />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-2xl ">
          View All courses
        </button>
      </div>
    </div>
  );
};

const CourseCard = ({
  title,
  status,
  btnText,
  validation,
  Resources,
}: {
  title: string;
  status: string;
  btnText: string;
  validation: string;
  Resources: string;
}) => (
  <div className="p-4 bg-gray-100 shadow-md rounded-lg">
    <img
      src="https://via.placeholder.com/150"
      alt="Course"
      className="w-full h-32 object-cover rounded-md"
    />
    <h3 className="mt-2 font-bold">{title}</h3>
    <p className="text-sm mt-4 text-gray-500">{status}</p>
    <p className="text-sm  text-gray-500">{validation}</p>
    <div className="flex flex-col justify-center w-full">
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-2xl flex items-center justify-center space-x-2">
        <FaWhatsapp />
        <span>{btnText}</span>
      </button>
      <button className="mt-4 bg-[#F2b301] text-white px-4 py-2 rounded-2xl flex items-center justify-center space-x-2">
        <FaGoogleDrive />
        <span>{Resources}</span>
      </button>
    </div>
  </div>
);

export default Courses;
