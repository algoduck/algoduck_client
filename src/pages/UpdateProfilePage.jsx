import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import AxiosInstance from "../common/AxiosInstance";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  const PASSWORD_POLICY =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,20}$/;

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const memberId = localStorage.getItem("memberId");
        if (!memberId) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

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
            profileImageUrl: member.profileImageUrl || "" // ✅ 기존 프로필 이미지 경로 저장
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

    try {
      const formData = new FormData();
      const memberDataBlob = new Blob(
        [
          JSON.stringify({
            password: form.password,
            statusMessage: form.statusMessage
          })
        ],
        { type: "application/json" }
      );

      formData.append("memberUpdateRequestDto", memberDataBlob);

      // 파일을 새로 선택한 경우만 파일 추가
      if (form.profileImage) {
        formData.append("file", form.profileImage);
      }

      const { data } = await AxiosInstance.put(`/members/${form.memberId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (data.success) {
        // localStorage 업데이트
        localStorage.setItem("nickname", data.data.nickname);
        localStorage.setItem(
          "profileImageUrl",
          data.data.profileImageUrl || form.profileImageUrl || ""
        );
        localStorage.setItem("statusMessage", data.data.statusMessage || "");

        alert("프로필 업데이트가 완료되었습니다!");
        navigate("/");
        window.location.reload(); // 메인페이지 새로고침해서 최신 데이터 반영
      } else {
        alert("업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  if (!form) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>로딩 중...</div>;
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">프로필 업데이트</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>로그인 아이디</label>
          <input type="text" name="loginId" value={form.loginId} disabled />
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input type="email" name="email" value={form.email} disabled />
        </div>

        <div className="form-group">
          <label>닉네임</label>
          <input type="text" name="nickname" value={form.nickname} disabled />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>상태 메시지</label>
          <input
            type="text"
            name="statusMessage"
            value={form.statusMessage}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>프로필 이미지</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-button">
          프로필 업데이트
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
