import React, { useState } from "react";
import LogoHeader from "../common/LogoHeader";
import ProblemCard from "../components/ProblemCard";
import Pagination from "../components/Pagination";
import useFetchList from "../hooks/useFetchList";

const ProblemListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

  const {
    data: problems,
    totalCount,
    isLoading
  } = useFetchList(
    "/problems",
    {
      pageNumber,
      pageSize
    },
    "problems"
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="px-4 py-10 text-center">
      <LogoHeader />
      <h1 className="my-8 text-3xl font-bold">📚 문제</h1>

      <div className="max-w-3xl mx-auto text-left">
        {isLoading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : problems.length === 0 ? (
          <p className="text-center text-gray-500">문제가 없습니다.</p>
        ) : (
          <ul className="p-0 list-none">
            {problems.map((problem) => (
              <ProblemCard key={problem.problemId} problem={problem} />
            ))}
          </ul>
        )}
      </div>

      <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
    </div>
  );
};

export default ProblemListPage;
