import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import ProblemDetail from "../components/ProblemDetail";
import CodeEditor from "../components/CodeEditor";
import ResultBox from "../components/ResultBox";

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result /* , setResult*/] = useState("실행 결과가 여기에 표시됩니다.");

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
        <ProblemDetail problem={problem} />

        {/* 코드 영역 */}
        <div
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <CodeEditor value={code} onChange={(e) => setCode(e.target.value)} />
          <ResultBox result={result} />
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
