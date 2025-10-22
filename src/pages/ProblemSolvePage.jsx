import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import ProblemDetail from "../components/ProblemDetail";
import CodeEditor from "../components/CodeEditor";
import ResultBox from "../components/ResultBox";
import TestcaseList from "../components/TestcaseList";
import useSessionValidationBeforeAction from "../hooks/useSessionValidationBeforeAction";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const ProblemSolvePage = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [result] = useState("실행 결과가 여기에 표시됩니다.");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [selectedLang, setSelectedLang] = useState(1001);

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

    try {
      const payload = {
        memberId,
        problemId: Number(problemId),
        sourceCode: code,
        versionId: selectedLang
      };

      const { data } = await AxiosInstance.post("/submissions", payload);
      if (data.success) {
        const member = JSON.parse(localStorage.getItem("member"));
        navigate(`/submissions/member/${memberId}`, {
          state: { nickname: member.nickname }
        });
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
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-screen-xl px-4 py-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center">
        {problem.problemNumber}. {problem.title}
      </h1>

      {/* 🔸 PanelGroup을 flex-1로 확실히 높이 지정 */}
      <div className="flex-1 border rounded-xl">
        <PanelGroup direction="horizontal" className="h-full" storageKey="layout-main">
          {/* 왼쪽: 문제 설명 + 테스트케이스 세로 분할 */}
          <Panel defaultSize={45} minSize={25}>
            <PanelGroup
              direction="vertical"
              storageKey="layout-problem-testcase"
              className="h-full pr-2"
            >
              <Panel defaultSize={70} minSize={30}>
                <div className="h-full overflow-y-auto">
                  <ProblemDetail problem={problem} />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-300 hover:bg-blue-400 cursor-row-resize" />

              <Panel defaultSize={30} minSize={20}>
                <div className="h-full overflow-y-auto">
                  <TestcaseList testcases={problem.testcaseResponseDtoList} />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-300 hover:bg-blue-400 cursor-col-resize" />

          {/* 오른쪽: 코드/결과 */}
          <Panel defaultSize={55} minSize={30}>
            <PanelGroup direction="vertical" storageKey="layout-editor-result" className="h-full">
              <Panel defaultSize={60} minSize={30}>
                <div className="flex flex-col h-full pl-2">
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <CodeEditor
                      value={code}
                      onChange={(value) => setCode(value)}
                      selectedLang={selectedLang}
                      onLangChange={(lang) => setSelectedLang(lang)}
                    />
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      onClick={handleSubmit}
                      disabled={!isLoggedIn}
                      className={`px-6 py-3 text-sm font-semibold rounded transition ${
                        isLoggedIn
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-300 text-white cursor-not-allowed"
                      }`}
                    >
                      제출하기
                    </button>
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-gray-300 hover:bg-blue-400 cursor-row-resize" />

              <Panel defaultSize={40} minSize={20}>
                <div className="h-full pl-2 overflow-auto">
                  <ResultBox result={result} />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default ProblemSolvePage;
