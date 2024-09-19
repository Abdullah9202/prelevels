"use client"
import React from 'react';
import Progress from "./progress";
import Courses from './courses';
import QuestionBankProgress from './questionbankprogress'; // Import the QuestionBankProgress component
import { useUser } from '@clerk/nextjs';

const DashboardPage = () => {
  const {user} = useUser();
  
  return (
    <div className="flex-1 p-6 lg:py-7 py-16">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Welcome Back, {user?.firstName} 👋</h1>
        <div className="space-x-4 flex">
          <StatCard title="24" subtitle="Days Streak" />
          <StatCard title="544" subtitle="Questions Solved" />
          <StatCard title="256" subtitle="Questions Remaining" />
        </div>
      </div>
      
      {/* Question Banks */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Continue Solving Question Banks</h2>
        <QuestionBankProgress />
      </div>
      
      {/* Progress Section */}
      <Progress />

      {/* Courses Section */}
      <Courses />
    </div>
  );
};

const StatCard = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="bg-gray-200 p-4 rounded-md text-center">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p>{subtitle}</p>
  </div>
);

export default DashboardPage;
