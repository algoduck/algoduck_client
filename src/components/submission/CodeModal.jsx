// src/components/submission/CodeModal.jsx
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// 확장자 → react-syntax-highlighter 언어 매핑
const extensionToLanguage = {
  java: "java",
  py: "python",
  cpp: "cpp",
  c: "c",
  js: "javascript",
  ts: "typescript",
  go: "go",
  rb: "ruby",
  kt: "kotlin",
  swift: "swift"
};

const CodeModal = ({ isOpen, codeContent, fileName, onClose }) => {
  if (!isOpen) return null;

  //  파일명으로부터 확장자 추출
  const ext = fileName?.split(".").pop()?.toLowerCase();
  const language = extensionToLanguage[ext] || "text";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-2xl p-4 bg-white rounded shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">제출한 코드</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
          </button>
        </div>
        <div className="p-2 overflow-auto bg-gray-100 rounded max-h-[70vh] text-sm">
          <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers wrapLongLines>
            {codeContent}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
