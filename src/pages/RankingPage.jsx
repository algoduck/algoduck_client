import React, { useState } from "react";
import OffsetPagination from "../components/pagination/OffsetPagination";
import MemberCard from "../components/MemberCard";
import useFetchList from "../hooks/useFetchList";

const RankingPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

  // 검색 상태
  const [searchType, setSearchType] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  // 검색 유형 정의
  const searchTypes = [
    { label: "아이디로 검색", value: "loginId" },
    { label: "닉네임으로 검색", value: "nickname" },
    { label: "푼 문제 수 범위", value: "count" },
    { label: "역할(Role)", value: "role" },
    { label: "랭킹", value: "rank" }
  ];

  // API 호출 설정
  const apiUrl = "/members";
  const params =
    searchType && searchQuery
      ? { type: searchType, query: searchQuery, pageNumber, pageSize }
      : { pageNumber, pageSize };

  const { data: members = [], totalCount = 0, isLoading } = useFetchList(apiUrl, params, "members");

  // ✅ 검색 실행
  const handleSearch = (type, query) => {
    setSearchType(type);
    setSearchQuery(query);
    setPageNumber(1);
  };

  // ✅ 검색 초기화 (전체 보기)
  const handleResetSearch = () => {
    setSearchType(null);
    setSearchQuery(null);
    setPageNumber(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const isSearching = searchType && searchQuery;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 상단 제목 */}
      <div className="flex-none pt-8 pb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {isSearching ? "🔍 검색 결과" : "🏆 랭킹"}
        </h1>

        {isSearching && (
          <button
            onClick={handleResetSearch}
            className="px-3 py-1 mt-3 text-sm text-gray-600 border rounded hover:bg-gray-100"
          >
            전체 보기로 돌아가기
          </button>
        )}
      </div>

      {/* 메인 리스트 */}
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

      {/* 하단 페이지네이션 */}
      <div className="flex-none sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] py-4">
        <OffsetPagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={setPageNumber}
          searchTypes={searchTypes}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default RankingPage;
