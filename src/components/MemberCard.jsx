// src/components/MemberCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MemberCard = ({ member, index, pageNumber, pageSize }) => {
  return (
    <li
      key={member.memberId}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <Link
        to={`/members/${member.memberId}`}
        style={{
          textDecoration: "none",
          color: "inherit"
        }}
      >
        <strong>{(pageNumber - 1) * pageSize + index + 1}위</strong> - {member.nickname} (
        {member.loginId})<br />
        <span>푼 문제 수: {member.solved}</span>
      </Link>
    </li>
  );
};

export default MemberCard;
