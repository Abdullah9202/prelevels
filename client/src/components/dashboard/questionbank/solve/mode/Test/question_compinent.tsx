// components/QuestionComponent.js
import { useState } from 'react';

interface QuestionData {
  question: string;
  options: { id: string; text: string }[];
  correctOption: string;
  explanation: string;
}

interface QuestionComponentProps {
  questionData: QuestionData;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ questionData, currentQuestionIndex, totalQuestions, onNext, onPrevious }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1}:</h2>
        <p className="text-lg">{questionData.question}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {questionData.options.map((option) => (
          <button
            key={option.id}
            className={`border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-200 ${
              selectedOption === option.id ? 'bg-gray-300' : ''
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            <span className="font-bold mr-2">{option.id}</span>
            {option.text}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {selectedOption && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Explanation:</h3>
          <p>
            {selectedOption === questionData.correctOption
              ? questionData.explanation
              : 'Wrong answer. Please try again!'}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-red-500 text-white rounded-lg p-3"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <div>
          {currentQuestionIndex + 1}/{totalQuestions}
        </div>
        <button
          className="bg-red-500 text-white rounded-lg p-3"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
