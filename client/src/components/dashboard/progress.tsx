import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  // Data for Topical Chart
  const topicalData = {
    labels: ["SU", "WR", "ME", "IO", "SR", "TM", "IR", "MO", "TE", "SA"],
    datasets: [
      {
        label: "Topical",
        data: [20, 10, 15, 7, 10, 22, 25, 18, 14, 8], // Example data, adjust as needed
        backgroundColor: "#5A67D8", // Blue color
        borderRadius: 10,
        barThickness: 15,
      },
    ],
  };

  // Data for Yearly Chart
  const yearlyData = {
    labels: ["SU", "WR", "ME", "IO", "SR", "TM", "IR", "MO", "TE", "SA"],
    datasets: [
      {
        label: "Yearly",
        data: [18, 21, 13, 9, 16, 20, 23, 14, 15, 21], // Example data, adjust as needed
        backgroundColor: "#ED8936", // Orange color
        borderRadius: 10,
        barThickness: 15,
      },
    ],
  };

  // Chart options to resemble the styling in the image
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 30,
        ticks: {
          stepSize: 5,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="mt-8 md:mt-1 flex flex-col space-y-4 mx-auto w-13/13 ">
      {/* Progress Section */}
      <div className="bg-[#D9D9D9] border-2 border-white pt-1 pb-6 pr-6 pl-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-1 text-gray-700">Progress</h2>

        {/* Topical Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Topical</h3>
          <div className="h-36">
            <Bar data={topicalData} options={options} />
          </div>
        </div>

        {/* Yearly Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-8 ">
          <h3 className="text-lg font-semibold mb-2">Yearly</h3>
          <div className="h-36 w-full">
            <Bar data={yearlyData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
