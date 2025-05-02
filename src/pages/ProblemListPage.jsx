import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import { Link } from "react-router-dom";

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
              <li key={problem.problemId} style={{ marginBottom: "12px" }}>
                <Link
                  to={`/problems/${problem.problemId}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: "#f9f9f9",
                      transition: "background-color 0.2s",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>
                      {problem.problemNumber}. {problem.title}
                    </div>
                    <div style={{ color: "#555" }}>난이도: {problem.difficulty}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handlePrev}
          disabled={pageNumber <= 1}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
            backgroundColor: "#fff"
          }}
        >
          ◀ 이전
        </button>

        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          페이지 {pageNumber} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={pageNumber >= totalPages}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: pageNumber >= totalPages ? "not-allowed" : "pointer",
            backgroundColor: "#fff"
          }}
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
};

export default ProblemListPage;
