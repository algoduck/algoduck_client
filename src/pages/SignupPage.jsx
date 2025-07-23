import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import FormGroup from "../components/FormGroup";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const LOGIN_ID_POLICY = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const PASSWORD_POLICY =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,20}$/;
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

    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      alert("파일 용량이 1MB를 초과합니다. 다른 이미지를 선택해주세요.");
      e.target.value = null; // 선택된 파일 초기화
      return;
    }

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
      const { data } = await AxiosInstance.get("/members/exists/login-id", {
        params: { loginId }
      });
      setIsUnique((prev) => ({ ...prev, loginId: data.data }));
    } catch {
      setIsUnique((prev) => ({ ...prev, loginId: true }));
    }
  };

  const checkEmail = async (email) => {
    try {
      const { data } = await AxiosInstance.get("/members/exists/email", {
        params: { email }
      });
      setIsUnique((prev) => ({ ...prev, email: data.data }));
    } catch {
      setIsUnique((prev) => ({ ...prev, email: true }));
    }
  };

  const checkNickname = async (nickname) => {
    try {
      const { data } = await AxiosInstance.get("/members/exists/nickname", {
        params: { nickname }
      });
      setIsUnique((prev) => ({ ...prev, nickname: data.data }));
    } catch {
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
        const member = {
          loginId: form.loginId,
          memberId: data.data.memberId,
          nickname: data.data.nickname,
          profileImageUrl: data.data.profileImageUrl,
          statusMessage: data.data.statusMessage
        };

        localStorage.setItem("member", JSON.stringify(member));
        alert("회원가입 및 로그인 성공!");
        dispatch(login(member));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50">
      <h1 className="mt-6 mb-8 text-2xl font-bold">회원가입</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <FormGroup
          label="로그인 아이디"
          type="text"
          name="loginId"
          value={form.loginId}
          onChange={handleChange}
        />
        {errors.loginId && <p className="mb-2 text-sm text-red-500">{errors.loginId}</p>}
        {form.loginId && !isUnique.loginId && (
          <p className="mb-2 text-sm text-red-500">중복된 아이디입니다.</p>
        )}

        <FormGroup
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="mb-2 text-sm text-red-500">{errors.password}</p>}

        <FormGroup
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {form.email && !isUnique.email && (
          <p className="mb-2 text-sm text-red-500">중복된 이메일입니다.</p>
        )}

        <FormGroup
          label="닉네임"
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
        />
        {errors.nickname && <p className="mb-2 text-sm text-red-500">{errors.nickname}</p>}
        {form.nickname && !isUnique.nickname && (
          <p className="mb-2 text-sm text-red-500">중복된 닉네임입니다.</p>
        )}

        <FormGroup
          label="상태 메시지"
          type="text"
          name="statusMessage"
          value={form.statusMessage}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">프로필 이미지</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
