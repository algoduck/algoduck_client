import React from "react";

const ProblemDetail = ({ problem }) => {
  return (
    <div className="flex-1 p-8 bg-gray-50 border-2 border-gray-100 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">문제 설명</h3>
      <p className="whitespace-pre-line leading-relaxed text-gray-800">{problem.description}</p>

      <h3 className="text-lg font-semibold mt-8 mb-2">입력</h3>
      <p className="whitespace-pre-line leading-relaxed text-gray-800">
        {problem.inputDescription}
      </p>

      <h3 className="text-lg font-semibold mt-8 mb-2">출력</h3>
      <p className="whitespace-pre-line leading-relaxed text-gray-800">
        {problem.outputDescription}
      </p>
    </div>
  );
};

export default ProblemDetail;
