import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import SubmissionCard from "../components/submission/SubmissionCard";
import SubmissionPagination from "../components/submission/SubmissionPagination";
import LogoHeader from "../common/LogoHeader";

const SubmissionListPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [firstSeenId, setFirstSeenId] = useState(null);
  const [lastSeenId, setLastSeenId] = useState(null);
  const size = 20;

  const fetchSubmissions = async (params = {}) => {
    try {
      const response = await AxiosInstance.get("/submissions/page", { params });
      const { content, hasNext, hasPrev } = response.data.data;

      console.log(content);

      setSubmissions(content);
      setHasNext(hasNext);
      setHasPrev(hasPrev);

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
  }, []);

  return (
    <div className="p-6">
      <LogoHeader />
      <h2 className="mb-4 text-xl font-bold">채점 현황</h2>
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
