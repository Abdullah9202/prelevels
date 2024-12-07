"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const OverallProgress = () => {
  // Radar chart data
  const data = {
    labels: [
      "SE",
      "LO",
      "KJ",
      "TR",
      "ED",
      "MJ",
      "BG",
      "IU",
      "AK",
      "AZ",
      "AS",
      "BV",
      "RE",
      "NB",
      "OP",
      "YQ",
      "TA",
      "TU",
      "MR",
    ],
    datasets: [
      {
        label: "Progress",
        data: [8, 10, 9, 8, 7, 6, 8, 5, 2, 4, 3, 6, 5, 4, 3, 8, 7, 9, 10],
        backgroundColor: "rgba(72, 191, 145, 0.2)",
        borderColor: "rgba(72, 191, 145, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(72, 191, 145, 1)",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: { color: "#ccc" },
        grid: { color: "#e5e7eb" },
        ticks: {
          display: true,
          backdropColor: "#f9fafb",
        },
        pointLabels: {
          color: "#374151",
          font: { size: 12 },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#374151",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-[400px] bg-gray-100 rounded-lg shadow-lg w-full p-4">
      <div className="w-full max-w-md h-[300px]">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default OverallProgress;
