import React from "react";

const SubmissionPagination = ({ hasNext, hasPrev, onNext, onPrev }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        이전
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        다음
      </button>
    </div>
  );
};

export default SubmissionPagination;
