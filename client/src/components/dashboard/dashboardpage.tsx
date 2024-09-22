"use client"
import React from 'react';
import Progress from "./progress";
import Courses from './courses';
import QuestionBankProgress from './questionbankprogress'; // Import the QuestionBankProgress component
import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const {user} = useUser();
  
  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto items-start">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between md:px-6 px-4 items-center mx-auto">
        <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0">
          Welcome Back, {user?.firstName} 👋
        </h1>

        <div className="md:space-x-4 space-x-2 flex">
          <StatCard title="24" subtitle="Days Streak" />
          <StatCard title="544" subtitle="Questions Solved" />
          <StatCard title="256" subtitle="Questions Remaining" />
        </div>
      </div>

      
      {/* Question Banks */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Continue Solving Question Banks</h2>
        
        <div className="relative z-10">
          <QuestionBankProgress />
        </div>

      </div>
      
      {/* Progress Section */}
      <Progress />

      {/* Courses Section */}
      <Courses />
    </div>
  );
};

const StatCard = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="bg-gray-200 md:p-4 p-2  rounded-md text-center">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p>{subtitle}</p>
  </div>
);

export default DashboardPage;
