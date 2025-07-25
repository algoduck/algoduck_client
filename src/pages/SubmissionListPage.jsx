import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import SubmissionCard from "../components/submission/SubmissionCard";
import SubmissionPagination from "../components/submission/SubmissionPagination";
import { useLocation, useParams } from "react-router-dom"; // 👈 memberId param 처리

const SubmissionListPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [firstSeenId, setFirstSeenId] = useState(null);
  const [lastSeenId, setLastSeenId] = useState(null);
  const [totalCount, setTotalCount] = useState(null); // 👈 제출 수
  const size = 20;

  const { memberId } = useParams(); // 👈 memberId가 있을 수도 있음
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
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">
        {nickname ? `${nickname}의 채점 현황` : "채점 현황"}
      </h2>

      {memberId && totalCount !== null && (
        <div className="mb-4 text-sm text-gray-600">
          총 제출 수: <span className="font-semibold">{totalCount}</span> 회
        </div>
      )}

      <div className="grid gap-4">
        {submissions.map((s) => (
          <SubmissionCard key={s.submissionId} submission={s} />
        ))}
      </div>

      <SubmissionPagination
        hasNext={hasNext}
        hasPrev={hasPrev}
        onNext={() => fetchSubmissions({ lastSeenId, size: size + 1 })}
        onPrev={() => fetchSubmissions({ firstSeenId, size: size + 1 })}
      />
    </div>
  );
};

export default SubmissionListPage;
