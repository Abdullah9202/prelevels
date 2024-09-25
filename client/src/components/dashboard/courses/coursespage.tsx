"use client"
import { useUser } from "@clerk/nextjs";
import { FaGoogleDrive, FaWhatsapp } from 'react-icons/fa';

export default function CoursePage(){
    const {user} = useUser();
    return (
        <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
            <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
            Welcome Back, {user?.firstName} 👋
            </h1>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <CourseCard
                title="Complete Physiology Test"
                status="By Prelevels"
                validation='Valid Till 02/2025'
                btnText="Join Meeting"
                Resources='Resources'
                />
                <CourseCard
                title="Complete Cardiology Test"
                status="By Prelevels"
                validation='Valid Till 02/2025'
                btnText="Join Meeting"
                Resources='Resources'
                />
                <CourseCard
                title="Complete Pathology Test"
                status="By Prelevels"
                validation='Valid Till 02/2025'
                btnText="Join Meeting"
                Resources='Resources'
                />
                <CourseCard
                title="Complete Pathology Test"
                status="By Prelevels"
                validation='Valid Till 02/2025'
                btnText="Join Meeting"
                Resources='Resources'
                />
                <CourseCard
                title="Complete Pathology Test"
                status="By Prelevels"
                validation='Valid Till 02/2025'
                btnText="Join Meeting"
                Resources='Resources'
                />
            </div>
        </div>
    )
}

const CourseCard = ({ title, status, btnText, validation,Resources }: { title: string, status: string, btnText: string , validation:string, Resources:string}) => (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <img src="https://via.placeholder.com/150" alt="Course" className="w-full h-32 object-cover rounded-md" />
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