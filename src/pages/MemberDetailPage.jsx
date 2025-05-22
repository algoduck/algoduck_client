import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import ProfileImage from "../components/ProfileImage";

const MemberDetailPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

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

    fetchMember();
  }, [memberId]);

  if (!member) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-center">
      <LogoHeader />

      <button
        onClick={() => navigate("/ranking")}
        className="mt-6 mb-10 px-4 py-2 text-sm border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 transition"
      >
        ◀ 랭킹 페이지로
      </button>

      <div className="bg-white border border-gray-200 rounded-md shadow p-6">
        <ProfileImage src={member.profileImageUrl} size={150} />

        <h1 className="text-2xl font-bold mt-4 mb-2">{member.nickname}</h1>

        <p className="text-gray-700 text-sm mb-1">아이디: {member.loginId}</p>
        <p className="text-gray-700 text-sm mb-1">이메일: {member.email}</p>
        <p className="text-gray-700 text-sm mb-1">푼 문제 수: {member.solved}</p>
        <p className="text-gray-700 text-sm">상태 메시지: {member.statusMessage}</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
