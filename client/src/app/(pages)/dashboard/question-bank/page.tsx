import Sidebar from "@/components/dashboard/sidebar";
import Question from "@/components/dashboard/questionbank/question";

export default function QuestionBankPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <Question />
    </div>
  );
}
