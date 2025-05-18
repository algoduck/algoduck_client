// src/components/ProblemCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  return (
    <li style={{ marginBottom: "12px" }}>
      <Link
        to={`/problems/${problem.problemId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#f9f9f9",
            transition: "background-color 0.2s",
            cursor: "pointer"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
        >
          <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>
            {problem.problemNumber}. {problem.title}
          </div>
          <div style={{ color: "#555" }}>난이도: {problem.difficulty}</div>
        </div>
      </Link>
    </li>
  );
};

export default ProblemCard;
