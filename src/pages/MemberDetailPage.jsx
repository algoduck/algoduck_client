import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";

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
    <div style={{ textAlign: "center", padding: "40px" }}>
      <LogoHeader />
      <button
        onClick={() => navigate("/ranking")}
        style={{
          marginBottom: "30px",
          padding: "10px 20px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
          cursor: "pointer"
        }}
      >
        ◀ 랭킹 페이지로
      </button>

      <div>
        <img
          src={member.profileImageUrl}
          alt="프로필 이미지"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px"
          }}
        />
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>{member.nickname}</h1>
        <p>아이디: {member.loginId}</p>
        <p>이메일: {member.email}</p>
        <p>푼 문제 수: {member.solved}</p>
        <p>상태 메시지: {member.statusMessage}</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
