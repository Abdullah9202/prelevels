"use client";



import { useUser } from "../../../../hooks/useUser";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useHandleLogout from "@/lib/logout";


const CourseCard = ({
  title,
  status,
  btnText,
  question,
  imageUrl,
  router,
}: {
  title: string;
  status: string;
  btnText: string;
  question: string;
  imageUrl:string;
  router: any;
}) => (
  <div className="p-4 bg-white shadow-md rounded-lg">
      <Image
      src={imageUrl}
      alt="Course"
      className="w-full h-32 object-cover rounded-md"
      width={300}
      height={300}
    />
    <h3 className="mt-2 font-bold">{title}</h3>
    <p className="text-sm mt-4 text-gray-500">{status}</p>
    <p className="text-sm  text-gray-500">{question}</p>
    <div className="flex flex-col justify-center w-full">
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-2xl flex items-center justify-center space-x-2"
        onClick={() => router.push("/dashboard/question-bank/solve")}
      >
        <span>{btnText}</span>
      </button>
    </div>
  </div>
);

export default function Question() {
  
  const user = useUser((state) => state.user);
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(0);
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const getDashboardCourses = async () => {
      const res = await fetch("/api/getDashboardQuestion_bank", {
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
  
  
  console.log("these are the question banks", coursesList)
  const router = useRouter();
  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
        Welcome Back, {user?.firstName} 👋
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {coursesList.map((course) => (
            <CourseCard
              key={course?.id}
              title={course?.name}
              status="by Prelevels"
              question={course?.question}
              btnText="Solve"
              imageUrl={`${process.env.NEXT_PUBLIC_API_URL}${course?.image}`}
              router={router}
            />
          ))}
        </div>
    </div>
  );
}
