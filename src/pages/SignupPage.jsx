import React, { useState } from "react";
import axios from "axios";

// Axios 기본 설정
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

const SignupPage = () => {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    email: "",
    nickname: "",
    statusMessage: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [isUnique, setIsUnique] = useState({
    loginId: false,
    email: false,
    nickname: false,
  });

  const LOGIN_ID_POLICY = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const PASSWORD_POLICY = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,20}$/;
  const NICKNAME_POLICY = /^[A-Za-z가-힣\d]{3,10}$/;

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
      const { data } = await axiosInstance.get(`/members/check-login-id`, { params: { loginId } });
      setIsUnique((prev) => ({ ...prev, loginId: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const checkEmail = async (email) => {
    try {
      const { data } = await axiosInstance.get(`/members/check-email`, { params: { email } });
      setIsUnique((prev) => ({ ...prev, email: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const checkNickname = async (nickname) => {
    try {
      const { data } = await axiosInstance.get(`/members/check-nickname`, { params: { nickname } });
      setIsUnique((prev) => ({ ...prev, nickname: data }));
    } catch (error) {
      console.error(error);
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

      // JSON 데이터를 Blob으로 추가
      const memberDataBlob = new Blob([
        JSON.stringify({
          loginId: form.loginId,
          password: form.password,
          email: form.email,
          nickname: form.nickname,
          role: "GENERAL",
          statusMessage: form.statusMessage,
        }),
      ], { type: "application/json" });

      formData.append("memberSaveRequestDto", memberDataBlob);

      // 프로필 이미지 추가
      if (form.profileImage) {
        formData.append("file", form.profileImage);
      }

      const { data } = await axiosInstance.post(`/members/join`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>로그인 아이디:</label>
          <input
            type="text"
            name="loginId"
            value={form.loginId}
            onChange={handleChange}
          />
          {errors.loginId && <p style={{ color: "red" }}>{errors.loginId}</p>}
          {!isUnique.loginId && <p style={{ color: "red" }}>중복된 아이디입니다.</p>}
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          {!isUnique.email && <p style={{ color: "red" }}>중복된 이메일입니다.</p>}
        </div>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
          />
          {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
          {!isUnique.nickname && <p style={{ color: "red" }}>중복된 닉네임입니다.</p>}
        </div>
        <div>
          <label>상태 메시지:</label>
          <input
            type="text"
            name="statusMessage"
            value={form.statusMessage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>프로필 이미지:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;
