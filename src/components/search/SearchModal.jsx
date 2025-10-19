import React, { useState } from "react";

const SearchModal = ({ isOpen, onClose, onSearch, searchTypes }) => {
  const [type, setType] = useState(searchTypes[0]?.value || "title");
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(type, query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-xl font-semibold text-center">문제 검색</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            {searchTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="px-3 py-2 border border-gray-300 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
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
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
