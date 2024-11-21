"use client";

import { FaGoogleDrive, FaWhatsapp } from "react-icons/fa";
import useTokens from "../../../../hooks/useTokens";
import { useUser } from "../../../../hooks/useUser";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

const CourseCard = ({
  title,
  status,
  btnText,
  question,
  router,
}: {
  title: string;
  status: string;
  btnText: string;
  question: string;
  router: any;
}) => (
  <div className="p-4 bg-white shadow-md rounded-lg">
    {/* <Image
      src="https://via.placeholder.com/150"
      alt="Course"
      className="w-full h-32 object-cover rounded-md"
    width={300} height={300}/> */}
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
  const {accessToken,refreshAccessTokens,refreshToken, verifyAccessToken, fetchTokens} = useTokens()
  const user = useUser((state) => state.user);
  
  useEffect(() => {
    const getQuestionBank = async () => {
      try {
        // Verify the token before making the API call
        const isTokenValid = await verifyAccessToken();
        if (!isTokenValid) {
          console.warn("Token invalid or expired. Attempting to refresh...");
          const refreshed = await refreshAccessTokens();
          if (!refreshed) {
            console.error("Unable to refresh token. User might need to log in.");
            alert("Session expired. Please log in again.");
            return; // Stop further execution
          }
        }
  
        // Proceed with the API call using the (now valid) accessToken
        const res = await fetch(
          "http://127.0.0.1:8000/api/questionbank/my-questionbanks/", // AZAK
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include access token here
            },
            credentials: "include", // Include credentials if needed
          }
        );
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          alert("Your response is successful");
          // Handle the response data as needed
          const data = await res.json();
          console.log("Question bank data:", data);
        }
      } catch (error) {
        console.error("Error fetching question bank:", error);
        if (error instanceof Error && error.message.includes("401")) {
          alert("Unauthorized. Please log in again.");
          // Optionally, redirect to login page
          // router.push("/login");
        }
      }
    };
  
    if (user?.username) {
      getQuestionBank();
    }
  }, [user, accessToken, verifyAccessToken, refreshAccessTokens]);
  
  const router = useRouter();
  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
        Welcome Back, {user?.firstName} 👋
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <CourseCard
          title="Complete Physiology Test"
          status="By Prelevels"
          question="200"
          btnText="Solve"
          router={router}
        />
        <CourseCard
          title="Complete Cardiology Test"
          status="By Prelevels"
          question="200"
          btnText="Solve"
          router={router}
        />
        <CourseCard
          title="Complete Pathology Test"
          status="By Prelevels"
          question="200"
          btnText="Solve"
          router={router}
        />
      </div>
    </div>
  );
}
