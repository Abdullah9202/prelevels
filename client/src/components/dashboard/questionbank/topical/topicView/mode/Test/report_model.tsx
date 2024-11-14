import { FC } from "react";

interface ReportModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ReportModel: FC<ReportModelProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-lg font-semibold mb-2">Report this question:</h1>
        <p className="text-sm mb-4">
          If you think there is an issue with the question or its option, you
          can report it here.
        </p>
        <textarea
          className="w-full border p-2 rounded-lg mb-4"
          placeholder="your comment (optional)"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModel;
