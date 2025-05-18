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
    <div style={{ textAlign: "center", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>🏆 랭킹</h1>

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        {isLoading ? (
          <p style={{ textAlign: "center" }}>로딩 중...</p>
        ) : members.length === 0 ? (
          <p style={{ textAlign: "center" }}>회원이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
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
