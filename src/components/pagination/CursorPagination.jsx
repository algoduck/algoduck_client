import React, { useEffect, useState } from "react";
import SubmissionSearchModal from "../search/SubmissionSearchModal";

const CursorPagination = ({ hasNext, hasPrev, onNext, onPrev, onSearch, resetTrigger }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  // ✅ resetTrigger가 바뀔 때마다 모달 초기화 신호 전송
  useEffect(() => {
    if (resetTrigger > 0) {
      setResetSignal((prev) => prev + 1);
    }
  }, [resetTrigger]);

  return (
    <>
      <div className="flex justify-center mt-6">
        <div className="inline-flex items-center gap-3">
          <div className="flex gap-4">
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
          </div>

          {/* 🔍 검색 버튼 */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="px-3 py-2 text-sm text-gray-700 transition bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            🔍 검색
          </button>
        </div>
      </div>

      {/* ✅ 채점현황용 검색 모달 */}
      <SubmissionSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(filters) => {
          onSearch(filters);
          setIsSearchOpen(false);
        }}
        resetSignal={resetSignal} // ✅ 전달
      />
    </>
  );
};

export default CursorPagination;
