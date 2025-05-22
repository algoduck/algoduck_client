import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import duckImage from "../assets/duckling.png";
import LogoHeader from "../common/LogoHeader";
import AuthButtonGroup from "../components/AuthButtonGroup";
import ProfileImage from "../components/ProfileImage";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const memberJson = localStorage.getItem("member");

    // const loginId = localStorage.getItem("loginId");
    // const nickname = localStorage.getItem("nickname");
    // const profileImageUrl = localStorage.getItem("profileImageUrl");
    // const statusMessage = localStorage.getItem("statusMessage");

    // if (loginId) {
    if (memberJson) {
      const member = JSON.parse(memberJson);
      // const loginId = member.loginId;
      const nickname = member.nickname;
      const profileImageUrl = member.profileImageUrl;
      const statusMessage = member.statusMessage;
      console.log("profileImageUrl = ", profileImageUrl);

      setIsLoggedIn(true);
      setNickname(nickname || "");
      setProfileImageUrl(profileImageUrl || "");
      setStatusMessage(statusMessage || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    // React 상태도 직접 초기화
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <LogoHeader />
      <h1 style={{ fontSize: "48px" }}>알고오리</h1>

      <img src={duckImage} alt="오리" style={{ width: "525px", margin: "30px 0" }} />

      {isLoggedIn && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "10px", color: "#4caf50", fontSize: "24px" }}>
            {nickname}님 환영합니다!
          </h2>
          {profileImageUrl && <ProfileImage src={profileImageUrl} />}
          {statusMessage && (
            <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>{statusMessage}</p>
          )}
        </div>
      )}

      <AuthButtonGroup
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onUpdate={handleUpdateProfile}
      />

      <div style={{ marginTop: "30px" }}>
        <Link to="/ranking">
          <button style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>랭킹</button>
        </Link>

        <Link to="/problems">
          <button style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>문제</button>
        </Link>

        <Link to="/submissions">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>채점 현황</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
