// src/components/Pagination.jsx
import React from "react";

const Pagination = ({ pageNumber, totalPages, onPrev, onNext }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <button
        onClick={onPrev}
        disabled={pageNumber <= 1}
        style={{
          margin: "0 10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          backgroundColor: "#fff"
        }}
      >
        ◀ 이전
      </button>

      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
        페이지 {pageNumber} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={pageNumber >= totalPages}
        style={{
          margin: "0 10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: pageNumber >= totalPages ? "not-allowed" : "pointer",
          backgroundColor: "#fff"
        }}
      >
        다음 ▶
      </button>
    </div>
  );
};

export default Pagination;
