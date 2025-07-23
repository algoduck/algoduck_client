import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import duckImage from "../assets/duckling.png";
import ProfileImage from "../components/ProfileImage";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const memberJson = localStorage.getItem("member");
    if (memberJson) {
      const member = JSON.parse(memberJson);
      setIsLoggedIn(true);
      setMemberId(member.memberId || "");
      setNickname(member.nickname || "");
      setProfileImageUrl(member.profileImageUrl || "");
      setStatusMessage(member.statusMessage || "");
    }
  }, []);

  const handleGoToMemberDetail = () => {
    if (memberId) {
      navigate(`/members/${memberId}`);
    }
  };

  return (
    <div className="px-4 mt-12 text-center">
      <h1 className="mt-4 mb-6 text-4xl font-bold">알고오리</h1>

      <img src={duckImage} alt="오리" className="w-[320px] md:w-[525px] mx-auto my-8" />

      {isLoggedIn && (
        <div className="mt-6 cursor-pointer hover:opacity-90" onClick={handleGoToMemberDetail}>
          <h2 className="mb-2 text-2xl font-semibold text-green-600">{nickname}님 환영합니다!</h2>
          {profileImageUrl && <ProfileImage src={profileImageUrl} />}
          {statusMessage && <p className="mt-2 text-lg text-gray-600">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default MainPage;
