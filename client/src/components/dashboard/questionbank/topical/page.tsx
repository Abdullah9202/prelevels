"use client";
import { useUser } from "../../../../../hooks/useUser";
import MDCAT from "@/assets/MDCATBanner.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopicalPage() {
  const user = useUser((state) => state.user)
  const router = useRouter();

  // Array to repeat the block of code
  const repeatedBlocks = Array(4).fill(null);

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
        <div className="bg-[#D9D9D9] shadow-sm rounded-lg mt-5 border-2 border-white">
          <h1 className="px-10 py-5 font-bold">
            <span className="text-red-500 font-bold pr-2">Logo</span>
            Sindh NMDCAT
          </h1>
          {repeatedBlocks.map((_, index) => (
            <div key={index} className="px-14 pb-4">
              <div className="flex justify-between items-center">
                <p>202{index}</p>
                <button onClick={()=> router.push('/dashboard/question-bank/topical/topicview')} className="bg-red-600 text-white px-4 py-1 rounded-3xl">
                  View Detail
                </button>
              </div>
              <hr className="border-1 border-gray-400 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-[#D9D9D9] shadow-sm rounded-lg mt-5 border-2 border-white">
          <h1 className="px-10 py-5 font-bold">
            <span className="text-red-500 font-bold pr-2">Logo</span>
            UHS MDCAT
          </h1>
          {repeatedBlocks.map((_, index) => (
            <div key={index} className="px-14 pb-4">
              <div className="flex justify-between items-center">
                <p>202{index}</p>
                <button onClick={()=> router.push('/dashboard/question-bank/topical/topicview')}  className="bg-red-600 text-white px-4 py-1 rounded-3xl">
                  View Detail
                </button>
              </div>
              <hr className="border-1 border-gray-400 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
