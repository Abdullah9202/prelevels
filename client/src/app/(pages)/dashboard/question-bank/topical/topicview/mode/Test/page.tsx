"use client";
// pages/index.js
import { useEffect, useState } from "react";
import { useTime } from "../../../../../../../../../hooks/useTime";
import { questions } from "@/components/dashboard/questionbank/solve/mode/Test/mockQuestion"; // Import dummy data
import QuestionComponent from "@/components/dashboard/questionbank/solve/mode/Test/question_component"; // Import the QuestionComponent
import QuestionModal from "@/components/dashboard/questionbank/solve/mode/Test/QuestionModel";
import ReportModel from "@/components/dashboard/questionbank/solve/mode/Test/report_model";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [isHighlighterActive, setHighlighter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleReportModelOpen = () => setIsReportModalOpen(true);
  const handleReportModelClose = () => setIsReportModalOpen(false);
  const time = useTime((state) => state.time)
  

  // report model submit function
  const handleReportModelSubmit = () => {
    alert("Report submitted");
  };

  useEffect(() => {
      const questionBankIdString = localStorage.getItem('question-bank-id');
      const question_bank_id = questionBankIdString ? JSON.parse(questionBankIdString) : null;
      const handleQuestions = async () => {
        const res = await fetch('/api/getQuestions' , {
          method:'POST',
          headers:{'Content-Type' : 'application/json'},
          body:JSON.stringify({question_id: question_bank_id})
        })
        handleQuestions()
      }
  }, [])

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (time === null || time <= 0) return;
    
    const intervalId = setInterval(() => {
      const currentTime = useTime.getState().time;
      if (currentTime === null || currentTime <= 1) {
        clearInterval(intervalId);
        useTime.getState().setTime(0);
      } else {
        useTime.getState().setTime(currentTime - 1);
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [time])

  

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const ToggleHighlighter = () => {
    setHighlighter(!isHighlighterActive);
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsModalOpen(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-100 p-4 shadow-md ">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="text-lg font-bold">
            MDCAT &gt; Sindh MDCAT 2023 &gt; Biology &gt; Genetics
          </div>
          <div className="text-gray-100 text-sm font-bold bg-red-500 px-4 py-2 rounded-2xl">
            <button   >Exit</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-grow bg-gray-50">
        {/* Sidebar */}
        <aside className="w-1/10 md:w-1/7 bg-white p-4 flex flex-col items-center">
          <h1 className="font-bold text-red-500">Logo</h1>
          <div className="mt-24 mb-40 flex space-y-2 flex-col mx-auto">
            <button
              onClick={ToggleHighlighter}
              className={`px-4 md:px-5 py-6 rounded-r-lg ${
                isHighlighterActive
                  ? "bg-brown-500"
                  : "hover:bg-[#F5D5D5] active:bg-[#F5D5D5]"
              }`}
              aria-label="Highlighter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill={isHighlighterActive ? "brown" : "red"}
                className="bi bi-highlighter"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065zM5.293 13.5 2.5 10.707v1.586L3.707 13.5z"
                />
              </svg>
            </button>

            <button
              onClick={handleModalOpen}
              className="hover:bg-[#F5D5D5] active:bg-[#F5D5D5] px-4 md:px-5 py-6 rounded-r-lg"
              aria-label="More options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </button>

            <button
              className="hover:bg-[#F5D5D5] active:bg-[#F5D5D5] px-4 md:px-5 py-6 rounded-r-lg"
              aria-label="More options"
              onClick={handleReportModelOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            </button>

            <ReportModel
              isOpen={isReportModalOpen}
              onClose={handleReportModelClose}
              onSubmit={handleReportModelSubmit}
            />
          </div>

          <button className="bg-green-500 text-white rounded-lg pr-2 pl-2 pt-3 pb-3 w-full mb-4">
            Info
          </button>
        </aside>

        {/* Main area */}
        <main className="flex-grow p-8">
          <div className="text-red-500 font-bold flex justify-between md:px-60 mb-9">
            Countdown: { time !==null ? formatTime(time) : 30}
            <div className="flex space-x-2 items-center">
              <h1 className="text-gray-700">Save</h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="red"
                  className="bi bi-floppy2-fill"
                  viewBox="0 0 16 16"
                >
                  <path fillRule='evenodd' d="M12 2h-2v3h2z" />
                  <path fillRule='evenodd' d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
                </svg>
              </button>
            </div>
          </div>
          <QuestionModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onQuestionSelect={handleQuestionSelect}
            totalQuestions={questions.length}
          />
          <QuestionComponent
            questionData={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleNext}
            isHighlighterActive={isHighlighterActive}
            onPrevious={handlePrevious}
          />
        </main>
      </div>
    </div>
  );
}
