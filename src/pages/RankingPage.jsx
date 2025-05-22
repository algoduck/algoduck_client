import React, { useState } from "react";
import LogoHeader from "../common/LogoHeader";
import Pagination from "../components/Pagination";
import MemberCard from "../components/MemberCard";
import useFetchList from "../hooks/useFetchList";

const RankingPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

  const {
    data: members,
    totalCount,
    isLoading
  } = useFetchList(
    "/members",
    {
      pageNumber,
      pageSize
    },
    "members"
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="px-4 py-10 text-center">
      <LogoHeader />
      <h1 className="mb-8 text-3xl font-bold">🏆 랭킹</h1>

      <div className="max-w-3xl mx-auto text-left">
        {isLoading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : members.length === 0 ? (
          <p className="text-center text-gray-500">회원이 없습니다.</p>
        ) : (
          <ul className="p-0 list-none">
            {members
              .sort((a, b) => b.solved - a.solved)
              .map((member, index) => (
                <MemberCard
                  key={member.memberId}
                  member={member}
                  index={index}
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                />
              ))}
          </ul>
        )}
      </div>

      <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
    </div>
  );
};

export default RankingPage;
