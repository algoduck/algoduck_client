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
  } = useFetchList(
    url,
    {
      pageNumber,
      pageSize
    },
    "problems"
  );

  const totalPages = Math.ceil(totalCount / pageSize);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      // 로딩이 시작된 시점 기록
      startTimeRef.current = performance.now();
      console.log("로딩 시작");
    } else if (!isLoading && startTimeRef.current) {
      // 로딩이 끝난 시점에서 경과 시간 계산
      const elapsed = performance.now() - startTimeRef.current;
      console.log(`로딩 완료 (걸린 시간: ${(elapsed / 1000).toFixed(2)}초)`);
      startTimeRef.current = null; // 다음 측정을 위해 초기화
    }
  }, [isLoading]);

  return (
    <div className="px-4 py-10 text-center">
      <h1 className="my-8 text-3xl font-bold">{nickname ? `📚 ${nickname}가 푼 문제` : "문제"}</h1>

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
