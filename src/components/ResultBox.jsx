import React from "react";

const ResultBox = ({ result }) => {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto border border-gray-300 rounded-xl bg-gray-50">
      <h4 className="mb-2 text-sm font-semibold text-gray-800">실행 결과</h4>
      <pre className="flex-1 overflow-auto text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
    </div>
  );
};

export default ResultBox;
