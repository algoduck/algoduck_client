import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignupPage.css";
import AxiosInstance from "../common/AxiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await AxiosInstance.post("/members/login", {
        loginId,
        password,
      });

      if (data.success) {
        const memberInfo = data.data; // 서버 응답 MemberResponseDto
        localStorage.setItem("loginId", loginId);
        localStorage.setItem("memberId", memberInfo.memberId);
        localStorage.setItem("nickname", memberInfo.nickname);
        localStorage.setItem("profileImageUrl", memberInfo.profileImageUrl || ""); // 추가 저장

        alert("로그인 성공!");
        navigate("/");
      } else {
        setError(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error(err);
      setError("로그인 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
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
