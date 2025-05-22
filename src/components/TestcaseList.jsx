import React from "react";

const TestcaseList = ({ testcases }) => {
  if (!testcases || testcases.length === 0) {
    return <p className="mt-4 text-sm text-gray-500">📭 공개 테스트케이스가 없습니다.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-base font-semibold">🧪 공개 테스트케이스</h3>
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden text-sm border border-gray-200 rounded-lg">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center border-b">#</th>
              <th className="px-4 py-2 text-left border-b">Input</th>
              <th className="px-4 py-2 text-left border-b">Output</th>
            </tr>
          </thead>
          <tbody>
            {testcases.map((tc, index) => (
              <tr key={tc.testcaseId} className="border-b">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 font-mono text-gray-700 whitespace-pre-wrap">
                  {tc.testcaseInputData || "N/A"}
                </td>
                <td className="px-4 py-2 font-mono text-gray-700 whitespace-pre-wrap">
                  {tc.testcaseOutputData || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestcaseList;
