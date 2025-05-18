// src/components/AuthButtonGroup.jsx
import React from "react";
import { Link } from "react-router-dom";

const AuthButtonGroup = ({ isLoggedIn, onLogout, onUpdate }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {isLoggedIn ? (
        <>
          <button
            onClick={onLogout}
            style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
          >
            로그아웃
          </button>
          <button
            onClick={onUpdate}
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
    </div>
  );
};

export default AuthButtonGroup;
