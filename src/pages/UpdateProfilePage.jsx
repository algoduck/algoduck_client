import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import FormGroup from "../components/FormGroup";
import useSessionGuard from "../hooks/useSessionGuard";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  const PASSWORD_POLICY =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,20}$/;

  useSessionGuard();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const memberJson = localStorage.getItem("member");
      if (!memberJson) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const loginMember = JSON.parse(memberJson);
      const memberId = loginMember.memberId;

      try {
        const { data } = await AxiosInstance.get(`/members/id/${memberId}`);
        if (data.success && data.data) {
          const member = data.data;
          setForm({
            memberId: member.memberId,
            loginId: member.loginId,
            email: member.email,
            nickname: member.nickname,
            statusMessage: member.statusMessage || "",
            password: "",
            profileImage: null,
            profileImageUrl: member.profileImageUrl || ""
          });
        } else {
          alert("회원 정보를 불러올 수 없습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        alert("회원 정보를 가져오는 데 실패했습니다.");
        navigate("/");
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, profileImage: file }));
  };

  const validatePolicy = () => {
    const newErrors = {};
    if (form.password && !PASSWORD_POLICY.test(form.password)) {
      newErrors.password = "비밀번호는 대소문자, 숫자, 특수문자를 포함해 8~20자여야 합니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePolicy()) return;

    const memberJson = localStorage.getItem("member");
    if (!memberJson) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const member = JSON.parse(memberJson);

    try {
      const formData = new FormData();
      const memberDataBlob = new Blob(
        [
          JSON.stringify({
            loginId: form.loginId,
            password: form.password,
            statusMessage: form.statusMessage,
            beforeProfileImageUrl: member.profileImageUrl
          })
        ],
        { type: "application/json" }
      );

      formData.append("memberUpdateRequestDto", memberDataBlob);
      if (form.profileImage) {
        formData.append("file", form.profileImage);
      }

      const { data } = await AxiosInstance.put(`/members/${form.memberId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        member.nickname = data.data.nickname;
        member.profileImageUrl = data.data.profileImageUrl || form.profileImageUrl || "";
        member.statusMessage = data.data.statusMessage || "";
        localStorage.setItem("member", JSON.stringify(member));

        alert("프로필 업데이트가 완료되었습니다!");
        navigate("/");
        window.location.reload();
      } else {
        alert("업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (!form) {
    return <div className="mt-40 text-lg text-center text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50">
      <LogoHeader />
      <h1 className="mt-6 mb-8 text-2xl font-bold">프로필 업데이트</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <FormGroup label="로그인 아이디" type="text" value={form.loginId} disabled />
        <FormGroup label="이메일" type="email" value={form.email} disabled />
        <FormGroup label="닉네임" type="text" value={form.nickname} disabled />

        <FormGroup
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="mb-2 text-sm text-red-500">{errors.password}</p>}

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
          프로필 업데이트
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
