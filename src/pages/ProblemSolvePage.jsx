import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import ProblemDetail from "../components/ProblemDetail";
import CodeEditor from "../components/CodeEditor";
import ResultBox from "../components/ResultBox";
import TestcaseList from "../components/TestcaseList";

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result /* , setResult*/] = useState("실행 결과가 여기에 표시됩니다.");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    // 로그인 상태 확인 (예: localStorage 사용 시)
    const memberJson = localStorage.getItem("member");

    console.log("memberJson = ", memberJson);

    if (memberJson) {
      const member = JSON.parse(memberJson);
      setIsLoggedIn(true);
      setMemberId(member.memberId); // 또는 user.memberId
    }

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

  const handleSubmit = async () => {
    if (!isLoggedIn || !memberId) {
      alert("로그인 후 제출할 수 있습니다.");
      return;
    }

    try {
      const payload = {
        memberId: memberId,
        problemId: Number(problemId),
        sourceCode: code,
        versionId: 1001 // Java 8
      };

      const { data } = await AxiosInstance.post("/submissions", payload);
      if (data.success) {
        alert("제출이 완료되었습니다!");
        console.log("제출 응답:", data.data);
        // 추후 제출 결과 폴링 또는 리다이렉트 구현 가능
      } else {
        alert("제출에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  if (!problem) return <div style={{ textAlign: "center", marginTop: "100px" }}>로딩 중...</div>;

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px" }}>
        {problem.problemNumber}. {problem.title}
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* 문제 설명 */}
        <div style={{ flex: 2 }}>
          <ProblemDetail problem={problem} />
          <TestcaseList testcases={problem.testcaseResponseDtoList} />
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
          <CodeEditor value={code} onChange={(e) => setCode(e.target.value)} />
          <ResultBox result={result} />

          {/* 제출 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={!isLoggedIn}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: isLoggedIn ? "#4CAF50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoggedIn ? "pointer" : "not-allowed",
              alignSelf: "flex-start"
            }}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
