import React, { useState, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const languageOptions = [
  { label: "Java 8", value: 1001 },
  { label: "Java 11", value: 1002 },
  { label: "Java 15", value: 1003 },
  { label: "Java 17", value: 1004 },
  { label: "C++98", value: 1005 },
  { label: "C++11", value: 1006 },
  { label: "C++14", value: 1007 },
  { label: "C++20", value: 1008 },
  { label: "C++23", value: 1009 },
  { label: "C++26", value: 1010 },
  { label: "Python 3", value: 1011 },
  { label: "Javascript", value: 1012 }
];

const CodeEditor = ({ value, onChange, selectedLang, onLangChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedLabel =
    languageOptions.find((opt) => opt.value === selectedLang)?.label || "Select...";

  const languageExtension = useMemo(() => {
    if ([1001, 1002, 1003, 1004].includes(selectedLang)) return java();
    if ([1005, 1006, 1007, 1008, 1009, 1010].includes(selectedLang)) return cpp();
    if (selectedLang === 1011) return python();
    if (selectedLang === 1012) return javascript();
    return java(); // 기본값
  }, [selectedLang]);

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* 드롭다운 */}
      <div className="absolute z-10 top-2 right-2">
        <div
          className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedLabel}
        </div>
        {showDropdown && (
          <div className="absolute right-0 z-20 w-32 mt-1 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg max-h-48">
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

      {/* 코드미러 (부모 패널 높이 100% 반영) */}
      <div className="flex-1 h-full">
        <CodeMirror
          value={value}
          height="100%"
          theme={oneDark}
          extensions={[languageExtension]}
          onChange={onChange}
          className="w-full h-full border border-gray-300 rounded-xl"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
