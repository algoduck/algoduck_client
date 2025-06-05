import React, { useState, useEffect } from "react";
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

  const [progress, setProgress] = useState(null);
  const [curStatus, setCurStatus] = useState(status);
  const [curMessage, setCurMessage] = useState(message);
  const [curExecutionTime, setCurExecutionTime] = useState(executionTime);
  const [curMemoryUsage, setCurMemoryUsage] = useState(memoryUsage);

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

  useEffect(() => {
    if (curStatus === "JUDGING") {
      const eventSource = new EventSource(
        `${process.env.REACT_APP_API_URL}/submissions/${submissionId}/progress`
      );

      eventSource.addEventListener("progress", (event) => {
        const data = JSON.parse(event.data);
        console.log("SSE event received:", data);
        setProgress(data);

        if (data.result !== "PASS") {
          setTimeout(() => {
            setCurStatus(data.result);
            setCurMessage(data.message);
            setCurExecutionTime(data.executionTime);
            setCurMemoryUsage(data.memoryUsage);
            eventSource.close();
          }, 300); // 딜레이로 부드러운 전환
        }
      });

      eventSource.onerror = (err) => {
        console.error("SSE 연결 오류:", err);
        eventSource.close();
      };

      return () => eventSource.close();
    }
  }, [submissionId, curStatus]);

  const renderMessage = () => {
    if (curStatus !== "JUDGING") return curMessage;
    if (progress) return `채점중... (${progress.percentage}%)`;
    return "채점 대기중...";
  };

  return (
    <div className="relative px-6 py-4 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>제출 #{submissionId}</span>
        <span className={getStatusStyle(curStatus)}>{renderMessage()}</span>
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
        <span>⏱ {curExecutionTime ?? "-"} ms</span>
        <span>💾 {curMemoryUsage ?? "-"} KB</span>
        <button onClick={handleCodeClick} className="text-blue-600 hover:underline">
          💻 {codeName}
        </button>
      </div>

      <CodeModal isOpen={isModalOpen} codeContent={codeContent} onClose={closeModal} />
    </div>
  );
};

export default SubmissionCard;
