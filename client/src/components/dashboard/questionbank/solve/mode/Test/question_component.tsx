import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Option {
  id: string;
  text: string;
  option_text: string;
  is_correct: boolean;
}

interface QuestionData {
  question_text: string;
  image?: string;
  options: Option[];
  why_correct_option: {
    why_correct_option_text: string;
  };
  why_incorrect_option: {
    why_incorrect_option_text: string;
  };
}

interface QuestionComponentProps {
  questionData: QuestionData;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  isHighlighterActive: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionData,
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onPrevious,
  isHighlighterActive,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowAnswers(true);
  };

  const isUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    setShowAnswers(false);
      onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1}:
        </h2>
        {isUrl(questionData?.image || "") ? (
          <Image
            src={questionData.image!}
            width={300}
            height={300}
            alt="Question"
            className="w-full h-auto"
          />
        ) : (
          <p className="text-lg">{questionData?.question_text}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {questionData.options.map((option) => (
          <button
            key={option.id}
            className={`border border-gray-300 rounded-lg p-4 text-left ${
              showAnswers
                ? option.is_correct
                  ? "bg-green-400"
                  : "bg-red-400"
                : ""
            }`}
            onClick={() => handleOptionSelect(option.id)}
            disabled={showAnswers}
          >
            {isUrl(option.text) ? (
              <Image
                src={option.text}
                width={300}
                height={300}
                alt={`Option ${option.id}`}
                className="w-full h-auto"
              />
            ) : (
              <>
                <span className="font-bold mr-2">{option.option_text}</span>
                {option.text}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showAnswers && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold mb-4">Explanation:</h3>
          <p>
            {selectedOption &&
            questionData.options.find((option) => option.id === selectedOption)
              
              ? questionData?.why_correct_option.why_correct_option_text
              : questionData?.why_incorrect_option?.why_incorrect_option_text}
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
          &laquo;&laquo; Previous
        </button>
        <div>
          {currentQuestionIndex + 1}/{totalQuestions}
        </div>
        <button
          className="bg-red-500 text-white rounded-lg p-3"
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next &raquo;&raquo;
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
