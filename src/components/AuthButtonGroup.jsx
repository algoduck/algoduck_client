import React from "react";
import { Link } from "react-router-dom";

const baseButtonClass =
  "mx-2 my-2 px-5 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition";

const AuthButtonGroup = ({ isLoggedIn, onLogout, onUpdate }) => {
  return (
    <div className="flex flex-wrap justify-center mt-6">
      {isLoggedIn ? (
        <>
          <button onClick={onLogout} className={baseButtonClass}>
            로그아웃
          </button>
          <button onClick={onUpdate} className={baseButtonClass}>
            회원 수정
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className={baseButtonClass}>로그인</button>
          </Link>
          <Link to="/signup">
            <button className={baseButtonClass}>회원가입</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtonGroup;
