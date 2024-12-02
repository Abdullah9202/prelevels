// components/QuestionComponent.js
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const highlightText = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && isHighlighterActive) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      range.surroundContents(span);
      selection.removeAllRanges(); // clear selection after highlighting
    }
  }, [isHighlighterActive]);

  useEffect(() => {
    if (isHighlighterActive) {
      document.addEventListener("mouseup", highlightText);
    } else {
      document.removeEventListener("mouseup", highlightText);
    }

    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mouseup", highlightText);
    };
  }, [isHighlighterActive, highlightText]);

  const isUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1}:
        </h2>
        {isUrl(questionData?.question) ? (
          <Image src={questionData.question} width={300} height={300} alt="Question" className="w-full h-auto" />
        ) : (
          <p className="text-lg">{questionData?.question}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {questionData?.options.map((option) => (
          <button
            key={option.id}
            className={`border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-200 ${
              selectedOption === option.id ? "bg-gray-300" : ""
            }`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {isUrl(option.text) ? (
              <Image src={option.text} width={300} height={300} alt={`Option ${option.id}`} className="w-full h-auto" />
            ) : (
              <>
                <span className="font-bold mr-2">{option.id}</span>
                {option.text}
              </>
            )}
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
              : "Wrong answer. Please try again!"}
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
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next &raquo;&raquo;
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;