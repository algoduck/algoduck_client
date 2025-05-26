import React from "react";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
  switch (status) {
    case "CORRECT":
      return "text-green-600 font-semibold";
    case "WRONG":
      return "text-red-500 font-semibold";
    case "COMPILATION_ERROR":
      return "text-purple-500 font-semibold";
    case "TIME_LIMIT_EXCEEDED":
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

  console.log("submission = ", submission);

  return (
    <div className="px-6 py-4 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      {/* 상단: 제출번호 + 결과 메시지 */}
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>제출 #{submissionId}</span>
        <span className={getStatusStyle(status)}>{message}</span>
      </div>

      {/* 문제 번호와 제목 */}
      <Link
        to={`/problems/${problemId}`}
        className="block mb-1 text-lg font-bold text-gray-900 hover:underline"
      >
        {problemId}. {problemTitle}
      </Link>

      {/* 제출자 */}
      <Link to={`/members/${memberId}`} className="mb-3 text-sm text-gray-500 hover:underline">
        제출자: {nickname}
      </Link>

      {/* 시간, 메모리, 언어 */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span>⏱ {executionTime ?? "-"} ms</span>
        <span>💾 {memoryUsage ?? "-"} KB</span>
        <span>💻 {codeName}</span>
      </div>
    </div>
  );
};

export default SubmissionCard;
