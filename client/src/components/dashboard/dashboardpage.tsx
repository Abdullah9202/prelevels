"use client";
import React from "react";
import Progress from "./progress";
import Courses from "./courses";
import QuestionBankProgress from "./questionbankprogress"; // Import the QuestionBankProgress component
import { useUser } from "../../../hooks/useUser";
import { FaCalendarAlt, FaCheckSquare, FaClock } from 'react-icons/fa';

const DashboardPage = () => {
  const user = useUser((state) => state.user)

  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      {/* Top Section */}
      <div className="w-full">
        <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
          Welcome Back, {user.full_name} 👋
        </h1>

        {/* Flex layout for md and larger */}
        <div className="md:flex md:flex-row-reverse md:gap-4 gap-2">
          {/* Progress Section */}
          <div className="md:w-1/3 md:ml-4 md:mt-0 mt-4 order-last md:order-first">
            <Progress />
          </div>

          <div className="md:w-2/3">
            {/* Stat Cards */}
            <div className="grid grid-cols-3 mt-4 md:mt-0 md:grid-cols-3 gap-2 md:gap-4 order-first md:order-none">
              <StatCard title={user.daysStreak} subtitle="Days Streak" icon={<FaCalendarAlt />} />
              <StatCard title={user.questionSolved} subtitle="Questions Solved" icon={<FaCheckSquare />} />
              <StatCard title={user.questionRemained} subtitle="Questions Remaining" icon={<FaClock />} />
            </div>

            {/* Question Banks Section */}
            <div className="w-full mt-6 md:mt-4">
              <QuestionBankProgress />
            </div>
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
  <div className="bg-[#D9D9D9] shadow-lg border-2 border-white  rounded-xl p-3 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200 ease-in-out w-full max-w-[200px] mx-auto">
    <div className="text-3xl text-blue-600">{icon}</div> {/* Icon color updated */}
    <div>
      <div className="text-xl font-semibold text-gray-800">{title}</div> {/* Slightly smaller title */}
      <div className="text-sm text-gray-500">{subtitle}</div> {/* Subtitle remains small */}
    </div>
  </div>
);

export default DashboardPage;
