import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import duckImage from "../assets/duck.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loginId = localStorage.getItem("loginId");
    const nickname = localStorage.getItem("nickname");
    const profileImageUrl = localStorage.getItem("profileImageUrl");
    const statusMessage = localStorage.getItem("statusMessage");

    if (loginId) {
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
      <h1 style={{ fontSize: "48px" }}>알고오리</h1>

      <img src={duckImage} alt="오리" style={{ width: "525px", margin: "30px 0" }} />

      {isLoggedIn && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ marginBottom: "10px", color: "#4caf50", fontSize: "24px" }}>
            {nickname}님 환영합니다!
          </h2>
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="프로필"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "10px"
              }}
            />
          )}
          {statusMessage && (
            <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>{statusMessage}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: "30px" }}>
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
            >
              로그아웃
            </button>
            <button
              onClick={handleUpdateProfile}
              style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
            >
              회원 수정
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
                로그인
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>
                회원가입
              </button>
            </Link>
          </>
        )}
        <Link to="/problems">
          <button style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}>문제</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
