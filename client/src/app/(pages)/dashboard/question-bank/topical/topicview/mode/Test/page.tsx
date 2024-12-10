"use client";
import { useEffect, useState } from "react";
import useHandleLogout from "@/lib/logout";
import { useTime } from "../../../../../../../../../hooks/useTime";
import QuestionComponent from "@/components/dashboard/questionbank/solve/mode/Test/question_component";
import QuestionModal from "@/components/dashboard/questionbank/solve/mode/Test/QuestionModal";
import ReportModel from "@/components/dashboard/questionbank/solve/mode/Test/report_model";
import { useRouter } from "next/navigation";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const handlelogout = useHandleLogout();
  const [isHighlighterActive, setHighlighter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [status, setStatus] = useState<number>(0);
  const [resetState, setResetState] = useState<boolean>(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [questionBankId, setQuestionBankId] = useState<string | null>(null);
  const router = useRouter();

  const handleReportModelOpen = () => setIsReportModalOpen(true);
  const handleReportModelClose = () => setIsReportModalOpen(false);
  const time = useTime((state) => state.time);

  useEffect(() => {
    const questionBankIdString = localStorage.getItem("question-bank-id");
    const question_bank_id = questionBankIdString ? JSON.parse(questionBankIdString) : null;
    setQuestionBankId(question_bank_id);

    console.log("question_bank_id:", question_bank_id); // Debugging log

    const handleQuestions = async () => {
      try {
        const res = await fetch("/backend/api/getQuestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question_id: question_bank_id }),
        });

        console.log("Request sent to /api/getQuestions"); // Debugging log

        const data = await res.json();
        if (res.ok) {
          setStatus(data?.status);
          setQuestionList(data?.questions_data);
          console.log("Fetched questions:", data); // Debugging log
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (question_bank_id) {
      handleQuestions(); // Call the function after defining it
    } else {
      console.error("No question_bank_id found in local storage");
    }
  }, []);

  useEffect(() => {
    if (status === 401) {
      handlelogout();
    }
  }, [status, handlelogout]);

  useEffect(() => {
    if (resetState) {
      setResetState(false); // Reset the resetState back to false after it has been set to true
    }
  }, [resetState]);

  useEffect(() => {
    if (questionList.length > 0) {
      setCurrentQuestionId(questionList[currentQuestionIndex]?.id);
    }
  }, [currentQuestionIndex, questionList]);

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setResetState(true); // Reset state when selecting a question from the modal
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setResetState(true);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setResetState(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/backend/api/saveQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: currentQuestionId, question_bank_id: questionBankId }),
      });

      if (res.ok) {
        console.log("Question saved successfully");
      } else {
        console.error("Failed to save question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const currentQuestion = questionList[currentQuestionIndex];

  return (
    <div>
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuestionSelect={handleQuestionSelect}
        totalQuestions={questionList.length}
      />
      {currentQuestion ? (
        <QuestionComponent
          questionData={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionList.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isHighlighterActive={isHighlighterActive}
          resetState={resetState} // Pass the resetState prop
        />
      ) : (
        <div>Loading questions...</div>
      )}
      <div className="flex space-x-2 items-center">
        <h1 className="text-gray-700">Save</h1>
        <button onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="red"
            className="bi bi-floppy2-fill"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M12 2h-2v3h2z" />
            <path
              fillRule="evenodd"
              d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}