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
    <div style={{ textAlign: "center", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>📚 문제 </h1>

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        {isLoading ? (
          <p style={{ textAlign: "center" }}>로딩 중...</p>
        ) : problems.length === 0 ? (
          <p style={{ textAlign: "center" }}>문제가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
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
