import React from "react";

const ProblemDetail = ({ problem }) => {
  return (
    <div className="flex-1 p-8 border-2 border-gray-100 bg-gray-50 rounded-2xl">
      <h3 className="mb-2 text-lg font-semibold">문제 설명</h3>
      <p className="leading-relaxed text-gray-800 whitespace-pre-line">{problem.description}</p>

      <h3 className="mt-8 mb-2 text-lg font-semibold">입력</h3>
      <p className="leading-relaxed text-gray-800 whitespace-pre-line">
        {problem.inputDescription}
      </p>

      <h3 className="mt-8 mb-2 text-lg font-semibold">출력</h3>
      <p className="leading-relaxed text-gray-800 whitespace-pre-line">
        {problem.outputDescription}
      </p>
    </div>
  );
};

export default ProblemDetail;
