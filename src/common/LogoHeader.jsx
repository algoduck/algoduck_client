import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const LogoHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 왼쪽 로고 */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <span className="text-3xl">🦆</span>
          <span className="text-2xl font-bold">알고오리</span>
        </div>

        {/* 오른쪽 모든 버튼 */}
        <div className="flex flex-wrap items-center justify-end space-x-2">
          <Link to="/problems">
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              문제
            </button>
          </Link>
          <Link to="/submissions">
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              채점현황
            </button>
          </Link>
          <Link to="/ranking">
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              랭킹
            </button>
          </Link>
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                로그아웃
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                회원 수정
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoHeader;
