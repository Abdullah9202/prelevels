import React from "react";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  onQuestionSelect: (questionIndex: number) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  onQuestionSelect,
}) => {
  if (!isOpen) return null;

  const questionDots = Array.from(
    { length: totalQuestions },
    (_, index) => index + 1
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-semibold mb-4">All Questions:</h2>
        
        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto grid grid-cols-10 gap-2">
          {questionDots.map((questionNumber) => (
            <button
              key={questionNumber}
              className="border border-red-500 rounded-full w-12 h-12 flex items-center justify-center text-red-500"
              onClick={() => onQuestionSelect(questionNumber - 1)} // Adjust for zero-indexing
            >
              {questionNumber}
            </button>
          ))}
        </div>
        
        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
