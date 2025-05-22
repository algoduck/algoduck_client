import React from "react";

const Pagination = ({ pageNumber, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxDisplayed = 5;
    const start = Math.max(1, pageNumber - 2);
    const end = Math.min(totalPages, start + maxDisplayed - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex justify-center flex-wrap gap-2">
      {pageNumber > 1 && (
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          &lt;
        </button>
      )}

      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-1 border rounded transition font-medium ${
            page === pageNumber
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {pageNumber < totalPages && (
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
