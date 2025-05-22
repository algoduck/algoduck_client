import React from "react";

const ResultBox = ({ result }) => {
  return (
    <div className="flex-1 border border-gray-300 rounded-xl p-4 bg-gray-50 h-[150px] overflow-y-auto">
      <h4 className="mb-2 text-sm font-semibold text-gray-800">실행 결과</h4>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
    </div>
  );
};

export default ResultBox;
