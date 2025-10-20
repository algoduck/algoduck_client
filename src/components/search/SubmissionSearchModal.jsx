import React, { useState } from "react";

const SubmissionSearchModal = ({ isOpen, onClose, onSearch }) => {
  const LANGUAGE_VERSION_MAP = {
    Java: [1001, 1002, 1003, 1004],
    "C++": [1005, 1006, 1007, 1008, 1009, 1010],
    Python: [1011],
    Javascript: [1012]
  };

  const [filters, setFilters] = useState({
    loginId: "",
    problemNumber: "",
    language: "",
    status: "",
    submissionId: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v && v.trim() !== "")
    );

    if (activeFilters.language) {
      const versionIds = LANGUAGE_VERSION_MAP[activeFilters.language];
      if (versionIds) {
        activeFilters.languageVersionIds = versionIds.join(",");
      }
      delete activeFilters.language;
    }

    onSearch(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      loginId: "",
      problemNumber: "",
      language: "",
      status: "",
      submissionId: ""
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[420px]">
        <h2 className="mb-4 text-xl font-semibold text-center">채점 내역 검색</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* 아이디 */}
          <input
            type="text"
            name="loginId"
            value={filters.loginId}
            onChange={handleChange}
            placeholder="아이디"
            className="px-3 py-2 border border-gray-300 rounded"
          />

          {/* 문제 번호 */}
          <input
            type="text"
            name="problemNumber"
            value={filters.problemNumber}
            onChange={handleChange}
            placeholder="문제 번호"
            className="px-3 py-2 border border-gray-300 rounded"
          />

          {/* 언어 */}
          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">언어 선택</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
          </select>

          {/* 상태 */}
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">상태 선택</option>
            <option value="AC">ACCEPTED</option>
            <option value="WA">WRONG ANSWER</option>
            <option value="TLE">TIME LIMIT EXCEEDED</option>
            <option value="MLE">MEMORY LIMIT EXCEEDED</option>
            <option value="RE">RUNTIME ERROR</option>
            <option value="CE">COMPIL ERROR</option>
            <option value="JUDGING">JUDGING</option>
          </select>

          {/* 제출 번호 */}
          <input
            type="text"
            name="submissionId"
            value={filters.submissionId}
            onChange={handleChange}
            placeholder="제출 번호"
            className="px-3 py-2 border border-gray-300 rounded"
          />

          {/* 버튼 영역 */}
          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
            >
              초기화
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                검색
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionSearchModal;
