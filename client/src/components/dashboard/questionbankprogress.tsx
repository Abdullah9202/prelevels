import React from 'react';
import { FaCheckCircle, FaHourglassHalf, FaUikit, FaAtom, FaWeight, FaChevronRight } from 'react-icons/fa';

const QuestionBankProgress = () => {
  const questionBanks = [
    { name: 'ETEA', level: 'Beginner', progress: 100, status: 'Completed', icon: <FaUikit size={24} />, bgColor: 'bg-blue-500' },
    { name: 'LUMS', level: 'Intermediate', progress: 70, status: 'In Progress', icon: <FaAtom size={24} />, bgColor: 'bg-purple-500' },
    { name: 'GAT', level: 'Advanced', progress: 30, status: 'In Progress', icon: <FaWeight size={24} />, bgColor: 'bg-red-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Continue Solving Question Banks</h2>
        <button className="text-sm text-gray-600 border border-gray-300 rounded-full px-4 py-1">See all</button>
      </div>
      <table className="w-full text-left rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 text-sm">
          <tr>
            <th className="py-3 px-4">Course Name</th>
            <th className="py-3 px-4">Progress</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4"></th> {/* Empty header for the arrow */}
          </tr>
        </thead>
        <tbody>
          {questionBanks.map((bank, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 px-4 flex items-center">
                <div className={`mr-4 p-3 rounded-lg ${bank.bgColor} text-white`}>
                  {bank.icon}
                </div>
                <div>
                  <span className="font-semibold text-gray-800">{bank.name}</span>
                  <div className="text-sm text-gray-500">{bank.level}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="relative w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
                    style={{ width: `${bank.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 mt-1 block text-right">{bank.progress}%</span>
              </td>
              <td className="py-4 px-4 text-right">
                {bank.status === 'Completed' ? (
                  <span className="flex items-center justify-end text-green-600 bg-green-100 border border-green-500 rounded-full px-3 py-1 text-sm">
                    <FaCheckCircle className="mr-2" /> {bank.status}
                  </span>
                ) : (
                  <span className="flex items-center justify-end text-yellow-500 bg-yellow-100 border border-yellow-500 rounded-full px-3 py-1 text-sm">
                    <FaHourglassHalf className="mr-2" /> {bank.status}
                  </span>
                )}
              </td>
              <td className="py-4 px-4 text-right">
                <FaChevronRight className="text-gray-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBankProgress;
