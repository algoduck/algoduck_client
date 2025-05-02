// src/components/LogoHeader.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const LogoHeader = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        textAlign: "center",
        padding: "20px 0",
        fontSize: "32px",
        fontWeight: "bold",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        userSelect: "none"
      }}
    >
      🦆 알고오리
    </div>
  );
};

export default LogoHeader;
