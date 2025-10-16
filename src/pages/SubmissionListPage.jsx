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
  const size = 20;

  const { memberId } = useParams();
  const location = useLocation();
  const nickname = location.state?.nickname;

  const fetchSubmissions = async (params = {}) => {
    try {
      const url = memberId ? `/submissions/page/member/${memberId}` : "/submissions/page";

      const response = await AxiosInstance.get(url, { params });
      const { content, hasNext, hasPrev, totalCount } = response.data.data;

      setSubmissions(content);
      setHasNext(hasNext);
      setHasPrev(hasPrev);
      setTotalCount(totalCount);

      if (content.length > 0) {
        setFirstSeenId(content[0].submissionId);
        setLastSeenId(content[content.length - 1].submissionId);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [memberId]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 상단 제목 */}
      <div className="flex-none pt-8 pb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {nickname ? `${nickname}의 채점 현황` : "채점 현황"}
        </h2>
        {memberId && totalCount !== null && (
          <p className="mt-1 text-sm text-gray-600">
            총 제출 수: <span className="font-semibold">{totalCount}</span> 회
          </p>
        )}
      </div>

      {/* 스크롤 영역 */}
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

      {/* 하단 고정 페이지네이션 */}
      <div className="flex-none sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] py-4">
        <CursorPagination
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={() => fetchSubmissions({ lastSeenId, size: size + 1 })}
          onPrev={() => fetchSubmissions({ firstSeenId, size: size + 1 })}
        />
      </div>
    </div>
  );
};

export default SubmissionListPage;
