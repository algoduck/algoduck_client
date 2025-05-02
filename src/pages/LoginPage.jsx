import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"; // 로그인도 동일 스타일 사용
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 이전 에러 초기화

    try {
      const { data } = await AxiosInstance.post("/members/login", {
        loginId,
        password
      });

      if (data.success) {
        const memberInfo = data.data;
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("memberId", memberInfo.memberId);
        localStorage.setItem("nickname", memberInfo.nickname);
        localStorage.setItem("profileImageUrl", memberInfo.profileImageUrl || "");
        localStorage.setItem("statusMessage", memberInfo.statusMessage || "");

        alert("로그인 성공!");
        navigate("/");
      } else {
        setError(data.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 오류로 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <LogoHeader />
      <h1 className="signup-title">로그인</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>아이디</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="submit-button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
