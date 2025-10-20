import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import SubmissionCard from "../components/submission/SubmissionCard";
import CursorPagination from "../components/pagination/CursorPagination";
import { useLocation, useParams } from "react-router-dom";

const SubmissionListPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [firstSeenId, setFirstSeenId] = useState(null);
  const [lastSeenId, setLastSeenId] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [resetTrigger, setResetTrigger] = useState(0); // ✅ 추가
  const size = 20;

  const { memberId } = useParams();
  const location = useLocation();
  const nickname = location.state?.nickname;

  const fetchSubmissions = async (extraParams = {}) => {
    try {
      const url = memberId ? `/submissions/page/member/${memberId}` : "/submissions/search";

      // ✅ reset 모드일 경우 검색 조건 무시
      const mergedParams = extraParams.reset ? { size } : { size, ...searchParams, ...extraParams };

      console.log("요청 파라미터:", mergedParams);

      const response = await AxiosInstance.get(url, { params: mergedParams });

      const { content, hasNext, hasPrev, totalCount } = response.data.data;

      setSubmissions(content);
      setHasNext(hasNext);
      setHasPrev(hasPrev);
      setTotalCount(totalCount);

      if (content.length > 0) {
        setFirstSeenId(content[0].submissionId);
        setLastSeenId(content[content.length - 1].submissionId);
      } else {
        setFirstSeenId(null);
        setLastSeenId(null);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  /** ✅ 최초 로드 */
  useEffect(() => {
    fetchSubmissions();
  }, [memberId]);

  const handleSearch = (filters) => {
    console.log("검색 조건:", filters);

    // 유효한 검색 조건만 필터링
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) =>
        typeof v === "string" ? v.trim() !== "" : v !== ""
      )
    );

    if (Object.keys(activeFilters).length === 0) return;

    setSearchParams(activeFilters);
    setFirstSeenId(null);
    setLastSeenId(null);
    fetchSubmissions(activeFilters);
  };

  const handleResetSearch = () => {
    setSearchParams({});
    setFirstSeenId(null);
    setLastSeenId(null);
    fetchSubmissions({ reset: true }); // ✅ 검색 조건 완전 초기화
    setResetTrigger((prev) => prev + 1); // ✅ 모달 입력값 초기화 트리거
  };

  const isSearching = Object.keys(searchParams).length > 0;
  const totalLabel = totalCount !== null ? `총 제출 수: ${totalCount}회` : "";

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 상단 제목 */}
      <div className="flex-none pt-8 pb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          {isSearching
            ? "🔍 검색 결과"
            : memberId
              ? `📜 ${nickname || "회원"}의 채점 현황`
              : "채점 현황"}
        </h2>

        {/* 전체 보기 버튼 */}
        {isSearching && (
          <button
            onClick={handleResetSearch}
            className="px-3 py-1 mt-3 text-sm text-gray-600 border rounded hover:bg-gray-100"
          >
            전체 보기로 돌아가기
          </button>
        )}

        {/* 총 제출 수 (회원 모드일 때만 표시) */}
        {memberId && totalLabel && <p className="mt-2 text-sm text-gray-600">{totalLabel}</p>}
      </div>

      {/* 리스트 영역 */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {submissions.length === 0 ? (
            <p className="py-10 text-center text-gray-500">제출 내역이 없습니다.</p>
          ) : (
            <div className="grid gap-4">
              {submissions.map((s) => (
                <SubmissionCard key={s.submissionId} submission={s} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 페이지네이션 */}
      <div className="flex-none sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] py-4">
        <CursorPagination
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={() => {
            if (lastSeenId) fetchSubmissions({ lastSeenId });
          }}
          onPrev={() => {
            if (firstSeenId) fetchSubmissions({ firstSeenId });
          }}
          onSearch={handleSearch}
          searchTypes={memberId ? null : []}
          resetTrigger={resetTrigger} // ✅ 전달
        />
      </div>
    </div>
  );
};

export default SubmissionListPage;
