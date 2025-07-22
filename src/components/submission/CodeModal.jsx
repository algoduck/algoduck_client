import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const ext = fileName?.split(".").pop()?.toLowerCase();
  const language = extensionToLanguage[ext] || "text";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
    } catch (err) {
      console.error("복사 실패", err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleDownload = () => {
    const blob = new Blob([codeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

        <div className="relative flex justify-end gap-2 mt-3">
          <div className="relative">
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              코드 복사
            </button>

            {/* 말풍선 */}
            <div
              className={`absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded shadow transition-opacity duration-500 whitespace-nowrap ${
                copied ? "opacity-100 bg-[rgba(255,255,0,0.5)] text-black" : "opacity-0"
              }`}
            >
              코드복사완료
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
          >
            다운로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
