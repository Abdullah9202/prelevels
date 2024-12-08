"use client";

import Image from "next/image";
import { FaGoogleDrive, FaWhatsapp } from "react-icons/fa";
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState } from "react";
import useHandleLogout from "@/lib/logout";

export default function CoursePage() {
  const user = useUser((state) => state.user);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(0);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const getDashboardCourses = async () => {
      const res = await fetch("/api/getDashboardCourses2", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const courses = await res.json();
      if (res.ok) {
        setCoursesList(courses?.data);
        setStatus(courses?.status);
      }
    };
    getDashboardCourses();
  }, []);

  useEffect(() => {
    if (status === 401) {
      handleLogout();
    }
  }, [status, handleLogout]);

  console.log("these are the courses", coursesList);

  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
        Welcome Back, {user?.full_name} 👋
      </h1>
      {coursesList.length === 0 ? (
        <p>You haven&apos;t bought any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {coursesList.map((course) => (
            <CourseCard
              key={course?.id}
              title={course?.title}
              status={course?.status}
              validation={course?.validation}
              btnText="Join Meeting"
              Resources="Resources"
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
  <div className="p-4 bg-white shadow-md rounded-lg">
    <Image
      src="https://via.placeholder.com/150"
      alt="Course"
      className="w-full h-32 object-cover rounded-md"
      width={400}
      height={400}
    />
    <h3 className="mt-2 font-bold">{title}</h3>
    <p className="text-sm mt-4 text-gray-500">{status}</p>
    <p className="text-sm text-gray-500">{validation}</p>
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