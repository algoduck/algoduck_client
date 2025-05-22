import React from "react";

const SubmissionRow = ({ submission }) => {
  const {
    submissionId,
    nickname,
    problemId,
    problemTitle,
    status,
    message,
    executionTime,
    memoryUsage,
    codeName
  } = submission;

  const statusColor =
    status === "AC"
      ? "text-green-600"
      : status === "WA"
        ? "text-red-600"
        : status === "CE"
          ? "text-purple-600"
          : "text-blue-600";

  return (
    <tr>
      <td className="p-2 border">{submissionId}</td>
      <td className="p-2 border">{nickname}</td>
      <td className="p-2 border">
        {problemId} {problemTitle}
      </td>
      <td className={`p-2 border font-semibold ${statusColor}`}>{message}</td>
      <td className="p-2 border">{executionTime ?? "-"} ms</td>
      <td className="p-2 border">{memoryUsage ?? "-"} KB</td>
      <td className="p-2 border">{codeName}</td>
    </tr>
  );
};

export default SubmissionRow;
