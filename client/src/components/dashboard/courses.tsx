import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaGoogleDrive, FaWhatsapp } from "react-icons/fa";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import useTokens from "../../../hooks/useTokens";





const Courses = () => {
  const { accessToken, refreshAccessTokens, verifyAccessToken } = useTokens();
  const user = useUser((state) => state.user);
  const [courses, setCourses] = useState<{ id: number; name: string; validity: string; resource_link: string; whatsapp_link: string; course_image: string; }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      if (!accessToken || !user?.username) alert("No user name and access tokens");
  
      try {
        const res = await fetch("http://127.0.0.1:8000/api/course/my-courses/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      }
    };
  
    getData();
  }, [accessToken, user?.username]);
  

  if (error) {
    console.log("access tokens",accessToken);
    console.log("Refresh access token", refreshAccessTokens)
    console.log('Verify access tokens', verifyAccessToken)
    return <div className="mt-8 bg-red-100 border-2 border-red-500 p-6 shadow-md rounded-lg mx-auto">{error}</div>;
  }

  return (
    <div className="mt-8 bg-[#D9D9D9] border-2 border-white p-6 shadow-md rounded-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.slice(0,3).map((course) => (
          <CourseCard
            key={course.id}
            title={course.name}
            status="By Prelevels"
            validation={course.validity}
            btnText="Join Meeting"
            resourcesLink={course.resource_link}
            whatsappLink={course.whatsapp_link}
            imageUrl={course.course_image} // Pass the image URL as a prop
          />
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button onClick={()=>router.push('/dashboard/courses')} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-2xl">
          View All Courses
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
  resourcesLink,
  whatsappLink,
  imageUrl, // Add imageUrl as a prop
}: {
  title: string;
  status: string;
  btnText: string;
  validation: string;
  resourcesLink: string;
  whatsappLink: string;
  imageUrl: string; // Add imageUrl type
}) => (
  <div className="p-4 bg-gray-100 shadow-md rounded-lg">
    <Image
      src={imageUrl} // Use the imageUrl prop
      alt="Course"
      width={300}
      height={300}
      className="w-full h-32 object-cover rounded-md"
    />
    <h3 className="mt-2 font-bold">{title}</h3>
    <p className="text-sm mt-4 text-gray-500">{status}</p>
    <p className="text-sm text-gray-500">{validation}</p>
    <div className="flex flex-col justify-center w-full">
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-2xl flex items-center justify-center space-x-2">
        <FaWhatsapp />
        <span>{btnText}</span>
      </a>
      <a href={resourcesLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-[#F2b301] text-white px-4 py-2 rounded-2xl flex items-center justify-center space-x-2">
        <FaGoogleDrive />
        <span>Resources</span>
      </a>
    </div>
  </div>
);

export default Courses;