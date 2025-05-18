// src/components/ResultBox.jsx
import React from "react";

const ResultBox = ({ result }) => {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#f9f9f9",
        height: "150px",
        overflowY: "auto"
      }}
    >
      <h4 style={{ marginBottom: "8px" }}>실행 결과</h4>
      <pre>{result}</pre>
    </div>
  );
};

export default ResultBox;
