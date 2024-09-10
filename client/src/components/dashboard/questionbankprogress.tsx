import React from 'react';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const QuestionBankProgress = () => {
  const questionBanks = [
    { name: 'ETEA', level: 'Beginner', progress: 100, status: 'Completed' },
    { name: 'LUMS', level: 'Intermediate', progress: 70, status: 'In Progress' },
    { name: 'GAT', level: 'Advanced', progress: 30, status: 'In Progress' },
  ];

  return (
    <div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Course Name</th>
            <th className="py-2">Progress</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {questionBanks.map((bank, index) => (
            <tr key={index}>
              <td className="py-4">
                <div className="flex items-center">
                  <span className="mr-3 font-semibold">{bank.name}</span>
                  <span className="text-gray-500 text-sm">({bank.level})</span>
                </div>
              </td>
              <td className="py-4">
                <div className="relative w-full bg-gray-200 h-2 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-2 bg-green-500 rounded-lg"
                    style={{ width: `${bank.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">{bank.progress}%</span>
              </td>
              <td className="py-4">
                {bank.status === 'Completed' ? (
                  <span className="flex items-center text-green-500">
                    <FaCheckCircle className="mr-2" /> {bank.status}
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-500">
                    <FaHourglassHalf className="mr-2" /> {bank.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBankProgress;
