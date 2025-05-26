// src/components/submission/CodeModal.jsx
import React from "react";

const CodeModal = ({ isOpen, codeContent, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-2xl p-4 bg-white rounded shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">제출한 코드</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✖
          </button>
        </div>
        <pre className="p-2 overflow-auto text-sm bg-gray-100 rounded max-h-[70vh] whitespace-pre-wrap">
          {codeContent}
        </pre>
      </div>
    </div>
  );
};

export default CodeModal;
