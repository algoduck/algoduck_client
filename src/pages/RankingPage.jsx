import React, { useState } from "react";
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
  } = useFetchList("/members", { pageNumber, pageSize }, "members");

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 상단 제목 — 고정 높이에서 제외되도록 flex-none */}
      <div className="flex-none pt-8 pb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">🏆 랭킹</h1>
      </div>

      {/* 가운데 스크롤 영역 — flex-grow */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto text-left">
          {isLoading ? (
            <p className="py-10 text-center text-gray-500">로딩 중...</p>
          ) : members.length === 0 ? (
            <p className="py-10 text-center text-gray-500">회원이 없습니다.</p>
          ) : (
            <ul className="p-0 m-0 list-none">
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
      </div>

      {/* 하단 고정 페이지네이션 */}
      <div className="flex-none sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] py-4">
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
      </div>
    </div>
  );
};

export default RankingPage;
