import React, { useEffect, useRef } from "react";

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-lg rounded-2xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-400 top-3 right-4 hover:text-gray-600"
        >
          ✕
        </button>

        {/* 검색 입력 */}
        <h2 className="mb-4 text-lg font-semibold text-center text-gray-800">검색</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(e.target.value);
          }}
          className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default SearchModal;
