"use client";
import { useUser } from "../../../../../hooks/useUser";
import MDCAT from "@/assets/MDCATBanner.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useHandleLogout from "@/lib/logout";

export default function SolveQuestion() {
  const handlelogout = useHandleLogout();
  const user = useUser((state) => state.user);
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const getYearlyData = async () => {
      try {
        const res = await fetch('/backend/api/getDashboardMyQuestionBank', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (res.ok) {
          setData(data?.user_data);
          console.log("Fetched data:", data); // Debugging log
          setStatus(data.status);
        } else {
          throw new globalThis.Error('Failed to fetch data');
        }
      } catch (error) {
        if (error instanceof globalThis.Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    getYearlyData();
  }, []);

  useEffect(() => {
    if (status === 401) {
      console.log("Unauthorized access, redirecting to login...");
      handlelogout();
    }
  }, [status, handlelogout]);


  const handlePushLogic = (questionId : string) => {
    localStorage.setItem('question-bank-id',JSON.stringify(questionId))
    router.push("/dashboard/question-bank/solve/mode")
  }

  // Group data by category
  const groupedData = data.reduce((acc, item) => {
    const category = item.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
        Welcome Back, {user?.full_name} 👋
      </h1>
      <div>
        <Image src={MDCAT} alt="MDCAT" className="w-full " />
        <div className="flex justify-center items-center mt-3 space-x-6 text-white">
          <button
            className="bg-red-600 rounded-3xl px-6 py-2"
            onClick={() => router.push("/dashboard/question-bank/solve")}
          >
            Yearly
          </button>
          <button
            className="bg-red-600 rounded-3xl px-6 py-2"
            onClick={() => router.push("/dashboard/question-bank/topical")}
          >
            Topical
          </button>
        </div>
      </div>
      {Object.keys(groupedData).map((category) => (
        <div key={category} className="bg-[#D9D9D9] shadow-sm rounded-lg mt-5 border-2 border-white">
          <h1 className="px-10 py-5 font-bold">
            <span className="text-red-500 font-bold pr-2">Logo</span>
            {category}
          </h1>
          {groupedData[category].map((item: any, index: number) => (
            <div key={item.id} className="px-14 pb-4">
              <div className="flex justify-between items-center">
                <p>{item.name}</p>
                <button
                  onClick={() => handlePushLogic(item?.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-3xl"
                >
                  Start Test
                </button>
              </div>
              <hr className="border-1 border-gray-400 w-full mt-2" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}