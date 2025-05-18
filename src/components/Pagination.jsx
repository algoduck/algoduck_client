// src/components/Pagination.jsx
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
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "8px"
      }}
    >
      {pageNumber > 1 && <button onClick={() => onPageChange(pageNumber - 1)}>&lt;</button>}

      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: "8px 14px",
            fontWeight: page === pageNumber ? "bold" : "normal",
            backgroundColor: page === pageNumber ? "#4caf50" : "#fff",
            color: page === pageNumber ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {page}
        </button>
      ))}

      {pageNumber < totalPages && (
        <button onClick={() => onPageChange(pageNumber + 1)}>&gt;</button>
      )}
    </div>
  );
};

export default Pagination;
