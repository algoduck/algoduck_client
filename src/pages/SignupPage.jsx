import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";

const SignupPage = () => {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    email: "",
    nickname: "",
    statusMessage: "",
    profileImage: null
  });

  const [errors, setErrors] = useState({});
  const [isUnique, setIsUnique] = useState({
    loginId: true,
    email: true,
    nickname: true
  });

  const LOGIN_ID_POLICY = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const PASSWORD_POLICY =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,20}$/;
  const NICKNAME_POLICY = /^[A-Za-z가-힣\d]{3,10}$/;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "loginId") checkLoginId(value);
    if (name === "email") checkEmail(value);
    if (name === "nickname") checkNickname(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, profileImage: file }));
  };

  const validatePolicy = () => {
    const newErrors = {};
    if (!LOGIN_ID_POLICY.test(form.loginId)) {
      newErrors.loginId = "아이디는 영문과 숫자를 포함해 6~20자여야 합니다.";
    }
    if (!PASSWORD_POLICY.test(form.password)) {
      newErrors.password = "비밀번호는 대소문자, 숫자, 특수문자를 포함해 8~20자여야 합니다.";
    }
    if (!NICKNAME_POLICY.test(form.nickname)) {
      newErrors.nickname = "닉네임은 한글, 영문, 숫자를 포함해 3~10자여야 합니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkLoginId = async (loginId) => {
    try {
      const { data } = await AxiosInstance.get("/members/exists/login-id", { params: { loginId } });
      setIsUnique((prev) => ({ ...prev, loginId: data.data }));
    } catch (error) {
      console.error(error);
      setIsUnique((prev) => ({ ...prev, loginId: true })); // 실패 시 "중복 아님" 처리
    }
  };

  const checkEmail = async (email) => {
    try {
      const { data } = await AxiosInstance.get("/members/exists/email", { params: { email } });
      setIsUnique((prev) => ({ ...prev, email: data.data }));
    } catch (error) {
      console.error(error);
      setIsUnique((prev) => ({ ...prev, email: true }));
    }
  };

  const checkNickname = async (nickname) => {
    try {
      const { data } = await AxiosInstance.get("/members/exists/nickname", {
        params: { nickname }
      });
      setIsUnique((prev) => ({ ...prev, nickname: data.data }));
    } catch (error) {
      console.error(error);
      setIsUnique((prev) => ({ ...prev, nickname: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePolicy()) return;

    if (!isUnique.loginId || !isUnique.email || !isUnique.nickname) {
      alert("중복된 정보가 있습니다.");
      return;
    }

    try {
      const formData = new FormData();
      const memberDataBlob = new Blob(
        [
          JSON.stringify({
            loginId: form.loginId,
            password: form.password,
            email: form.email,
            nickname: form.nickname,
            role: "GENERAL",
            statusMessage: form.statusMessage
          })
        ],
        { type: "application/json" }
      );

      formData.append("memberSaveRequestDto", memberDataBlob);
      if (form.profileImage) {
        formData.append("file", form.profileImage);
      }

      await AxiosInstance.post("/members", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const { data } = await AxiosInstance.post("/members/login", {
        loginId: form.loginId,
        password: form.password
      });

      if (data.success) {
        localStorage.setItem("loginId", form.loginId);
        localStorage.setItem("memberId", data.data.memberId);
        localStorage.setItem("nickname", data.data.nickname);
        localStorage.setItem("profileImageUrl", data.data.profileImageUrl || "");
        localStorage.setItem("statusMessage", data.data.statusMessage || "");
        // console.log("profileImageUrl = ", profileImageUrl);

        alert("회원가입 및 로그인 성공!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <LogoHeader />
      <h1 className="signup-title">회원가입</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 로그인 아이디 */}
        <div className="form-group">
          <label>로그인 아이디</label>
          <input type="text" name="loginId" value={form.loginId} onChange={handleChange} />
          {errors.loginId && <p className="error-text">{errors.loginId}</p>}
          {form.loginId && !isUnique.loginId && <p className="error-text">중복된 아이디입니다.</p>}
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* 이메일 */}
        <div className="form-group">
          <label>이메일</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {form.email && !isUnique.email && <p className="error-text">중복된 이메일입니다.</p>}
        </div>

        {/* 닉네임 */}
        <div className="form-group">
          <label>닉네임</label>
          <input type="text" name="nickname" value={form.nickname} onChange={handleChange} />
          {errors.nickname && <p className="error-text">{errors.nickname}</p>}
          {form.nickname && !isUnique.nickname && (
            <p className="error-text">중복된 닉네임입니다.</p>
          )}
        </div>

        {/* 상태 메시지 */}
        <div className="form-group">
          <label>상태 메시지</label>
          <input
            type="text"
            name="statusMessage"
            value={form.statusMessage}
            onChange={handleChange}
          />
        </div>

        {/* 프로필 이미지 */}
        <div className="form-group">
          <label>프로필 이미지</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
