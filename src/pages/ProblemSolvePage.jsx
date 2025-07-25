import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import ProblemDetail from "../components/ProblemDetail";
import CodeEditor from "../components/CodeEditor";
import ResultBox from "../components/ResultBox";
import TestcaseList from "../components/TestcaseList";
import useSessionValidationBeforeAction from "../hooks/useSessionValidationBeforeAction";
import { useNavigate } from "react-router-dom";

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result /* , setResult */] = useState("실행 결과가 여기에 표시됩니다.");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);

  const validateSession = useSessionValidationBeforeAction();
  const navigate = useNavigate();

  useEffect(() => {
    const memberJson = localStorage.getItem("member");
    if (memberJson) {
      const member = JSON.parse(memberJson);
      setIsLoggedIn(true);
      setMemberId(member.memberId);
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
    const isValid = await validateSession();
    if (!isValid) return;

    if (!isLoggedIn || !memberId) {
      alert("로그인 후 제출할 수 있습니다.");
      return;
    }

    if (!code.trim()) {
      alert("코드를 작성한 후 제출해주세요.");
      return;
    }

    console.log("selectedLang = ", selectedLang);

    try {
      const payload = {
        memberId,
        problemId: Number(problemId),
        sourceCode: code,
        versionId: selectedLang
      };

      const { data } = await AxiosInstance.post("/submissions", payload);
      if (data.success) {
        // alert("제출이 완료되었습니다!");
        navigate(`/submissions/member/${memberId}`);
        console.log("제출 응답:", data.data);
      } else {
        alert("제출에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  if (!problem) return <div className="mt-40 text-lg text-center text-gray-500">로딩 중...</div>;

  return (
    <div className="max-w-screen-xl px-4 py-10 mx-auto">
      <h1 className="mb-10 text-3xl font-bold text-center">
        {problem.problemNumber}. {problem.title}
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 문제 설명 + 테스트케이스 */}
        <div className="flex-1">
          <ProblemDetail problem={problem} />
          <TestcaseList testcases={problem.testcaseResponseDtoList} />
        </div>

        {/* 코드 작성 영역 */}
        <div className="flex-[1.5] flex flex-col gap-4">
          <CodeEditor
            value={code}
            onChange={(e) => setCode(e.target.value)}
            selectedLang={selectedLang} // 이거 빠졌었음!
            onLangChange={(lang) => setSelectedLang(lang)} // 함수도 이렇게 넘겨줘야 작동함
          />
          <ResultBox result={result} />

          <button
            onClick={handleSubmit}
            disabled={!isLoggedIn}
            className={`self-end px-6 py-3 text-sm font-semibold rounded transition ${
              isLoggedIn
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-white cursor-not-allowed"
            }`}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
