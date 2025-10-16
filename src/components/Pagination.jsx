import React, { useState } from "react";
import SearchModal from "./search/SearchModal";

const Pagination = ({ pageNumber, totalPages, onPageChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query) => {
    console.log("검색:", query);
    setIsSearchOpen(false);
    // 필요 시 onSearch(query) 등으로 검색 결과 요청
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayed = 5;
    const start = Math.max(1, pageNumber - 2);
    const end = Math.min(totalPages, start + maxDisplayed - 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="px-3 py-2 text-sm transition bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ 이전
          </button>

          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm rounded font-medium border transition ${
                page === pageNumber
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={pageNumber === totalPages}
            className="px-3 py-2 text-sm transition bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음 ▶
          </button>
        </div>

        {/* 🔍 검색 버튼 */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="px-3 py-2 ml-4 text-sm text-gray-700 transition bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          🔍 검색
        </button>
      </div>

      {/* 모달 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
};

export default Pagination;
