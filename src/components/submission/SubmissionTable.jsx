import React from "react";
import SubmissionRow from "./SubmissionRow";

const SubmissionTable = ({ submissions }) => {
  return (
    <table className="w-full border text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">제출 번호</th>
          <th className="p-2 border">아이디</th>
          <th className="p-2 border">문제</th>
          <th className="p-2 border">결과</th>
          <th className="p-2 border">시간</th>
          <th className="p-2 border">메모리</th>
          <th className="p-2 border">언어</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((s) => (
          <SubmissionRow key={s.submissionId} submission={s} />
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;
