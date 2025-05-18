// src/components/TestcaseList.jsx
import React from "react";

const TestcaseList = ({ testcases }) => {
  if (!testcases || testcases.length === 0) {
    return <p>📭 공개 테스트케이스가 없습니다.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>🧪 공개 테스트케이스</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th style={{ padding: "8px" }}>#</th>
            <th style={{ padding: "8px" }}>Input</th>
            <th style={{ padding: "8px" }}>Output</th>
          </tr>
        </thead>
        <tbody>
          {testcases.map((tc, index) => (
            <tr key={tc.testcaseId} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px", textAlign: "center" }}>{index + 1}</td>
              <td style={{ padding: "8px", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {tc.testcaseInputData || "N/A"}
              </td>
              <td style={{ padding: "8px", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {tc.testcaseOutputData || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestcaseList;
