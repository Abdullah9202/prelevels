"use client";
import React from "react";
import Progress from "./progress";
import Courses from "./courses";
import QuestionBankProgress from "./questionbankprogress"; // Import the QuestionBankProgress component
import { useUser } from "@clerk/nextjs";
import { FaCalendarAlt, FaCheckSquare, FaClock } from 'react-icons/fa';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      {/* Top Section */}
      <div className="w-full">
        <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
          Welcome Back, {user?.firstName} 👋
        </h1>

        {/* Grid for md and larger */}
        <div className="md:grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-2">
          {/* Stat Cards */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <StatCard title="24" subtitle="Days Streak" icon={<FaCalendarAlt />} />
          <StatCard title="544" subtitle="Questions Solved" icon={<FaCheckSquare />} />
          <StatCard title="256" subtitle="Questions Remaining" icon={<FaClock />} />
        </div>

          {/* Question Banks Section */}
          <div className="md:col-span-2 w-[560px] ">
            {/* <h2 className="text-xl font-semibold mb-4">
              Continue Solving Question Banks
            </h2> */}
            <QuestionBankProgress />
          </div>

          {/* Progress Section */}
          <div className="md:col-span-1 md:mt-8 mt-4 bg-white p-6 shadow-lg rounded-lg">
            <Progress />
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-8">
          <Courses />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  subtitle,
  icon
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-3 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200 ease-in-out w-full max-w-[200px] mx-auto">
    <div className="text-3xl text-blue-600">{icon}</div> {/* Icon color updated */}
    <div>
      <div className="text-xl font-semibold text-gray-800">{title}</div> {/* Slightly smaller title */}
      <div className="text-sm text-gray-500">{subtitle}</div> {/* Subtitle remains small */}
    </div>
  </div>
);


export default DashboardPage;
