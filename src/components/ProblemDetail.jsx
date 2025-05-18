// src/components/ProblemDetail.jsx
import React from "react";

const ProblemDetail = ({ problem }) => {
  return (
    <div
      style={{
        flex: 2,
        padding: "30px",
        border: "2px solid #eee",
        borderRadius: "16px",
        backgroundColor: "#fafafa"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>문제 설명</h3>
      <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.description}</p>

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>입력</h3>
      <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.inputDescription}</p>

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>출력</h3>
      <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.outputDescription}</p>
    </div>
  );
};

export default ProblemDetail;
