import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const baseButtonClass =
  "mx-2 my-2 px-5 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition";

const LogoHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    // navigate("/");
  };

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  return (
    <div className="text-center bg-white border-b border-gray-200 select-none">
      <div onClick={handleClick} className="py-6 text-3xl font-bold cursor-pointer">
        🦆 알고오리
      </div>

      <div className="flex flex-wrap justify-center pb-4">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className={baseButtonClass}>
              로그아웃
            </button>
            <button onClick={handleUpdate} className={baseButtonClass}>
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
    </div>
  );
};

export default LogoHeader;
