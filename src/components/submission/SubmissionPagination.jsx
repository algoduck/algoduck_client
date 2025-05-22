import React from "react";

const SubmissionPagination = ({ hasNext, hasPrev, onNext, onPrev }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
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
  );
};

export default SubmissionPagination;
