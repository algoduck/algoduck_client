import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await AxiosInstance.get(`/problems/id/${problemId}`);
        if (data.success) setProblem(data.data);
        else alert("문제를 불러오는 데 실패했습니다.");
      } catch (err) {
        console.error(err);
        alert("오류가 발생했습니다.");
      }
    };

    fetchProblem();
  }, [problemId]);

  if (!problem) return <div style={{ textAlign: "center", marginTop: "100px" }}>로딩 중...</div>;

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px" }}>
        {problem.problemNumber}. {problem.title}
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* 문제 설명 */}
        <div
          style={{
            flex: 2,
            padding: "30px",
            border: "2px solid #eee",
            borderRadius: "16px",
            backgroundColor: "#fafafa"
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>문제 설명</h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.description}</p>

          <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>입력</h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.inputDescription}</p>

          <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>출력</h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{problem.outputDescription}</p>
        </div>

        {/* 코드 영역 */}
        <div
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <textarea
            placeholder="여기에 코드를 입력하세요..."
            style={{
              flex: 3,
              width: "100%",
              height: "400px",
              padding: "16px",
              fontSize: "16px",
              fontFamily: "monospace",
              borderRadius: "12px",
              border: "1px solid #ccc",
              resize: "vertical"
            }}
          />

          <div
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "#f9f9f9",
              height: "150px",
              overflowY: "auto"
            }}
          >
            <h4 style={{ marginBottom: "8px" }}>실행 결과</h4>
            <pre> 실행 결과가 여기에 표시됩니다.</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
