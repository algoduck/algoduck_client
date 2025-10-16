import { React, useState } from "react";
import SearchModal from "../search/SearchModal";

const SubmissionPagination = ({ hasNext, hasPrev, onNext, onPrev }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query) => {
    console.log("검색:", query);
    // 검색 로직 연결 가능 (ex. navigate(`/search?query=${query}`))
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="px-4 py-2 text-sm text-gray-800 transition bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀ 이전
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="px-4 py-2 text-sm text-white transition bg-blue-500 border border-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음 ▶
        </button>

        {/* 🔍 검색 버튼 */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="px-3 py-2 ml-4 text-sm text-gray-700 transition bg-white border border-gray-300 rounded hover:bg-gray-100"
        >
          🔍 검색
        </button>
      </div>

      {/* 검색 모달 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
};

export default SubmissionPagination;
