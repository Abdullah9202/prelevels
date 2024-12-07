"use client";
import { useUser } from "../../../hooks/useUser";
import { FaCalendarAlt, FaCheckSquare, FaClock } from "react-icons/fa";
import Progress from "./progress";
import OverallProgress from "./radarComponenet";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Statistics = () => {
  const user = useUser((state) => state.user);

  return (
    <div className="flex-1 md:p-6 p-4 lg:py-7 py-4 bg-gray-100 md:mr-0 mx-auto">
      <div className="w-full">
        <h1 className="md:text-3xl text-xs w-full md:w-auto font-semibold mb-4 md:mb-0 md:pb-9">
          Welcome Back, {user?.full_name} 👋
        </h1>

        <div className="flex md:flex-row md:px-8">
          <div className="grid grid-cols-3 mt-4 md:mt-0 md:grid-cols-3 gap-2 md:gap-20 order-first md:order-none">
            <StatCard
              title={user?.daysStreak || "0"}
              subtitle="Days Streak"
              icon={<FaCalendarAlt />}
            />
            <StatCard
              title={user?.questionSolved || "0"}
              subtitle="Questions Solved"
              icon={<FaCheckSquare />}
            />
            <StatCard
              title={user?.questionRemained || "0"}
              subtitle="Questions Remaining"
              icon={<FaClock />}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 grid grid-rows-1 md:px-8 md:space-x-10 mt-4 ">
          <div>
            <Progress />
          </div>
          <div className="bg-[#D9D9D9] border-2 border-white shadow-md rounded-lg p-4 flex justify-center items-center">
            <div className="w-full">
              <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
                Overall Progress
              </h2>
              <OverallProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-[#D9D9D9] shadow-lg border-2 border-white rounded-xl p-3 md:p-14 flex items-center space-x-1 md:space-x-4 transform hover:scale-105 transition-transform duration-200 ease-in-out w-full max-w-[200px] mx-auto">
    <div className="md:text-3xl text-xs break-words whitespace-normal text-blue-600">
      {icon}
    </div>
    <div>
      <div className="text-xl font-semibold text-gray-800">{title}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  </div>
);

export default Statistics;
