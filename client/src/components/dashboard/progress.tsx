import React from 'react';

const Progress = () => {
  return (
    <div className="mt-8 flex space-x-4 mx-auto">
      <div className="w-1/2 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Progress</h2>
        {/* Use a library like react-chartjs-2 for the chart */}
        <div className="h-48">[Progress Chart]</div>
      </div>
      <div className="w-1/2 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Yearly Progress</h2>
        <div className="h-48">[Yearly Chart]</div>
      </div>
    </div>
  );
};

export default Progress;
