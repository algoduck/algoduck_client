import React, { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";

const languageOptions = [
  { label: "Java 8", value: 1001 },
  { label: "Java 11", value: 1002 },
  { label: "Java 15", value: 1003 },
  { label: "Java 17", value: 1004 }
];

const CodeEditor = ({ value, onChange, selectedLang, onLangChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedLabel =
    languageOptions.find((opt) => opt.value === selectedLang)?.label || "Select...";

  // PK 기반 언어 매핑 (필요시 다른 언어 추가 가능)
  const languageExtension = useMemo(() => {
    switch (selectedLang) {
      case 1001:
      case 1002:
      case 1003:
      case 1004:
        return java();
      default:
        return java(); // 기본값
    }
  }, [selectedLang]);

  return (
    <div className="relative w-full h-[400px]">
      {/* 드롭다운 */}
      <div className="absolute z-10 top-2 right-2">
        <div
          className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedLabel}
        </div>
        {showDropdown && (
          <div className="absolute right-0 z-20 w-32 mt-1 bg-white border border-gray-300 rounded shadow-lg">
            {languageOptions.map((opt) => (
              <div
                key={opt.value}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onLangChange(opt.value);
                  setShowDropdown(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CodeMirror 에디터 */}
      <CodeMirror
        value={value}
        height="400px"
        theme={oneDark}
        extensions={[languageExtension]}
        onChange={onChange}
        className="border border-gray-300 rounded-xl"
      />
    </div>
  );
};

export default CodeEditor;
