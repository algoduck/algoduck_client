import React from "react";
import LogoHeader from "./LogoHeader"; // 경로는 프로젝트 구조에 맞게
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <LogoHeader />
      <main className="pt-20">
        {" "}
        {/* 헤더 높이만큼 여백 */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
