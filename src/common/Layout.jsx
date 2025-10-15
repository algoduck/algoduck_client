import React from "react";
import LogoHeader from "./LogoHeader"; // 경로는 프로젝트 구조에 맞게
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LogoHeader />
      {/* 헤더 높이 약 64px 만큼 여백 */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
