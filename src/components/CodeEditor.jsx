import React from "react";

const CodeEditor = ({ value, onChange }) => {
  return (
    <textarea
      placeholder="여기에 코드를 입력하세요..."
      value={value}
      onChange={onChange}
      className="w-full h-[400px] p-4 text-sm font-mono rounded-xl border border-gray-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default CodeEditor;
