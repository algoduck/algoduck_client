import React from "react";
import { Link } from "react-router-dom";

const MemberCard = ({ member, index, pageNumber, pageSize }) => {
  const rank = (pageNumber - 1) * pageSize + index + 1;

  return (
    <li key={member.memberId}>
      <Link
        to={`/members/${member.memberId}`}
        className="block border border-gray-200 rounded-md p-4 mb-3 bg-white shadow hover:shadow-md transition text-gray-800 no-underline"
      >
        <div className="text-lg font-semibold mb-1">
          <span className="text-blue-600 font-bold">{rank}위</span> - {member.nickname}{" "}
          <span className="text-sm text-gray-500">({member.loginId})</span>
        </div>
        <div className="text-sm text-gray-600">푼 문제 수: {member.solved}</div>
      </Link>
    </li>
  );
};

export default MemberCard;
