// src/components/CodeEditor.jsx
import React from "react";

const CodeEditor = ({ value, onChange }) => {
  return (
    <textarea
      placeholder="여기에 코드를 입력하세요..."
      value={value}
      onChange={onChange}
      style={{
        flex: 3,
        width: "100%",
        height: "400px",
        padding: "16px",
        fontSize: "16px",
        fontFamily: "monospace",
        borderRadius: "12px",
        border: "1px solid #ccc",
        resize: "vertical"
      }}
    />
  );
};

export default CodeEditor;
