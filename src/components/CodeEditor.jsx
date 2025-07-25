import React, { useState } from "react";

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

  const handleSelect = (value) => {
    onLangChange(value);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full h-[400px]">
      {/* 드롭다운 - 오른쪽 상단 */}
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
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 텍스트에디터 */}
      <textarea
        placeholder="여기에 코드를 입력하세요..."
        value={value}
        onChange={onChange}
        className="w-full h-full p-4 font-mono text-sm border border-gray-300 resize-y rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default CodeEditor;
