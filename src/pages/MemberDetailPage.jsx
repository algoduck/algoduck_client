import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import ProfileImage from "../components/ProfileImage";

const MemberDetailPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const { data } = await AxiosInstance.get(`/members/id/${memberId}`);
        if (data.success) {
          setMember(data.data);
        } else {
          alert("회원 정보를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error(err);
        alert("회원 정보 조회 중 오류가 발생했습니다.");
      }
    };

    const fetchSubmissionCount = async () => {
      try {
        const res = await AxiosInstance.get(`/submissions/page/member/${memberId}?size=1`);
        setSubmissionCount(res.data.data.totalCount);
      } catch (err) {
        console.error(err);
        setSubmissionCount(null);
      }
    };

    fetchMember();
    fetchSubmissionCount();
  }, [memberId]);

  const goToSubmissions = () => {
    navigate(`/submissions/member/${memberId}`, {
      state: { nickname: member.nickname }
    });
  };

  const goToSolvedProblems = () => {
    navigate(`/problems/solved/${memberId}`);
  };

  if (!member) return null;

  return (
    <div className="max-w-xl px-4 py-10 mx-auto text-center">
      <button
        onClick={() => navigate("/ranking")}
        className="px-4 py-2 mt-6 mb-10 text-sm transition bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
      >
        ◀ 랭킹 페이지로
      </button>

      <div className="p-6 bg-white border border-gray-200 rounded-md shadow">
        <ProfileImage src={member.profileImageUrl} size={150} />

        <h1 className="mt-4 mb-2 text-2xl font-bold">{member.nickname}</h1>

        <p className="mb-1 text-sm text-gray-700">아이디: {member.loginId}</p>
        <p className="mb-1 text-sm text-gray-700">이메일: {member.email}</p>
        <p className="mb-1 text-sm text-gray-700">
          푼 문제 수:{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={goToSolvedProblems}
          >
            {member.solved}
          </span>
        </p>
        <p className="mb-1 text-sm text-gray-700">
          제출:{" "}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={goToSubmissions}>
            {submissionCount !== null ? `${submissionCount} 회` : "불러오는 중..."}
          </span>
        </p>
        <p className="text-sm text-gray-700">상태 메시지: {member.statusMessage}</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
