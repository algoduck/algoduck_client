import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import FormGroup from "../components/FormGroup";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await AxiosInstance.post("/members/login", {
        loginId,
        password
      });

      if (data.success) {
        localStorage.setItem("member", JSON.stringify(data.data));
        alert("로그인 성공!");
        // 로그인 성공 시
        dispatch(login(data.data));
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <LogoHeader />
      <h1 className="mt-4 mb-6 text-2xl font-bold">로그인</h1>
      <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <FormGroup
          label="아이디"
          type="text"
          name="loginId"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />

        <FormGroup
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
