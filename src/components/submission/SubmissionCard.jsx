import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../common/AxiosInstance";
import CodeModal from "./CodeModal";

const getStatusStyle = (status) => {
  switch (status) {
    case "CORRECT":
    case "AC":
      return "text-green-600 font-semibold";
    case "WRONG":
    case "WA":
      return "text-red-500 font-semibold";
    case "COMPILATION_ERROR":
    case "CE":
      return "text-purple-500 font-semibold";
    case "TIME_LIMIT_EXCEEDED":
    case "TLE":
      return "text-yellow-500 font-semibold";
    default:
      return "text-gray-600 font-semibold";
  }
};

const SubmissionCard = ({ submission }) => {
  const {
    submissionId,
    nickname,
    memberId,
    problemId,
    problemTitle,
    message,
    executionTime,
    memoryUsage,
    codeName,
    status
  } = submission;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeContent, setCodeContent] = useState("");

  const handleCodeClick = async () => {
    try {
      const { data } = await AxiosInstance.get(`/submissions/${submissionId}/code`);
      setCodeContent(data.data);
      setIsModalOpen(true);
    } catch (error) {
      alert("코드를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCodeContent("");
  };

  return (
    <div className="relative px-6 py-4 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>제출 #{submissionId}</span>
        <span className={getStatusStyle(status)}>{message}</span>
      </div>

      <Link
        to={`/problems/${problemId}`}
        className="block mb-1 text-lg font-bold text-gray-900 hover:underline"
      >
        {problemId}. {problemTitle}
      </Link>

      <Link to={`/members/${memberId}`} className="mb-3 text-sm text-gray-500 hover:underline">
        제출자: {nickname}
      </Link>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span>⏱ {executionTime ?? "-"} ms</span>
        <span>💾 {memoryUsage ?? "-"} KB</span>
        <button onClick={handleCodeClick} className="text-blue-600 hover:underline">
          💻 {codeName}
        </button>
      </div>

      <CodeModal
        isOpen={isModalOpen}
        codeContent={codeContent}
        fileName={codeName}
        onClose={closeModal}
      />
    </div>
  );
};

export default SubmissionCard;
