import React from "react";

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
    problemId,
    problemTitle,
    message,
    executionTime,
    memoryUsage,
    codeName
  } = submission;

  return (
    <div className="p-6 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>제출 #{submissionId}</span>
        <span className={getStatusStyle(submission.status)}>{message}</span>
      </div>

      <div className="mb-1 text-lg font-semibold text-gray-800">
        {problemId}. {problemTitle}
      </div>

      <div className="mb-2 text-sm text-gray-600">제출자: {nickname}</div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <span>⏱ 시간: {executionTime ?? "-"} ms</span>
        <span>💾 메모리: {memoryUsage ?? "-"} KB</span>
        <span>💻 언어: {codeName}</span>
      </div>
    </div>
  );
};

export default SubmissionCard;
