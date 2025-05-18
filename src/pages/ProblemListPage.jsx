import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import ProblemCard from "../components/ProblemCard";
import Pagination from "../components/Pagination";

const ProblemListPage = () => {
  const [problems, setProblems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(totalCount / pageSize); // 전체 페이지 수 계산

  const fetchProblems = async () => {
    try {
      const { data } = await AxiosInstance.get("/problems", {
        params: { pageNumber, pageSize }
      });

      if (data.success) {
        setProblems(data.data.problems);
        setTotalCount(data.data.totalCount);
      } else {
        alert("문제 목록을 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("문제 조회 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>📚 문제 </h1>

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        {problems.length === 0 ? (
          <p style={{ textAlign: "center" }}>문제가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {problems.map((problem) => (
              <ProblemCard key={problem.problemId} problem={problem} />
            ))}
          </ul>
        )}
      </div>

      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default ProblemListPage;
