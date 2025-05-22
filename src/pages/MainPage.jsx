import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import duckImage from "../assets/duckling.png";
import LogoHeader from "../common/LogoHeader";
import ProfileImage from "../components/ProfileImage";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const memberJson = localStorage.getItem("member");
    if (memberJson) {
      const member = JSON.parse(memberJson);
      setIsLoggedIn(true);
      setNickname(member.nickname || "");
      setProfileImageUrl(member.profileImageUrl || "");
      setStatusMessage(member.statusMessage || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setNickname("");
    setProfileImageUrl("");
    setStatusMessage("");
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  return (
    <div className="px-4 mt-12 text-center">
      <LogoHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} onUpdate={handleUpdateProfile} />
      <h1 className="mt-4 mb-6 text-4xl font-bold">알고오리</h1>

      <img src={duckImage} alt="오리" className="w-[320px] md:w-[525px] mx-auto my-8" />

      {isLoggedIn && (
        <div className="mt-6">
          <h2 className="mb-2 text-2xl font-semibold text-green-600">{nickname}님 환영합니다!</h2>
          {profileImageUrl && <ProfileImage src={profileImageUrl} />}
          {statusMessage && <p className="mt-2 text-lg text-gray-600">{statusMessage}</p>}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to="/ranking">
          <button className="px-5 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600">
            랭킹
          </button>
        </Link>

        <Link to="/problems">
          <button className="px-5 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600">
            문제
          </button>
        </Link>

        <Link to="/submissions">
          <button className="px-5 py-2 text-sm text-white transition bg-blue-500 rounded hover:bg-blue-600">
            채점 현황
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
