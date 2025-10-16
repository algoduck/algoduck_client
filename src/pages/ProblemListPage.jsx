import React, { useEffect, useRef, useState } from "react";
import ProblemCard from "../components/ProblemCard";
import Pagination from "../components/Pagination";
import useFetchList from "../hooks/useFetchList";
import { useLocation, useParams } from "react-router-dom";

const ProblemListPage = () => {
  const { memberId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;
  const location = useLocation();
  const nickname = location.state?.nickname;

  const url = memberId ? `/problems/solved/${memberId}` : "/problems";

  const {
    data: problems,
    totalCount,
    isLoading
  } = useFetchList(url, { pageNumber, pageSize }, "problems");

  const totalPages = Math.ceil(totalCount / pageSize);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = performance.now();
      console.log("로딩 시작");
    } else if (!isLoading && startTimeRef.current) {
      const elapsed = performance.now() - startTimeRef.current;
      console.log(`로딩 완료 (걸린 시간: ${(elapsed / 1000).toFixed(2)}초)`);
      startTimeRef.current = null;
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 상단 제목 */}
      <div className="flex-none pt-8 pb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {nickname ? `📚 ${nickname}가 푼 문제` : "문제"}
        </h1>
      </div>

      {/* 문제 리스트 스크롤 영역 */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto text-left">
          {isLoading ? (
            <p className="py-10 text-center text-gray-500">로딩 중...</p>
          ) : problems.length === 0 ? (
            <p className="py-10 text-center text-gray-500">문제가 없습니다.</p>
          ) : (
            <ul className="p-0 m-0 list-none">
              {problems.map((problem) => (
                <ProblemCard key={problem.problemId} problem={problem} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 하단 고정 페이지네이션 */}
      <div className="flex-none sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] py-4">
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
      </div>
    </div>
  );
};

export default ProblemListPage;
