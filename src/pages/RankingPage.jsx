import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import Pagination from "../components/Pagination";
import MemberCard from "../components/MemberCard";

const RankingPage = () => {
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchMembers = async () => {
    try {
      const { data } = await AxiosInstance.get("/members", {
        params: { pageNumber, pageSize }
      });

      if (data.success) {
        setMembers(data.data.members);
        setTotalCount(data.data.totalCount);
      } else {
        alert("회원 정보를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("회원 정보 조회 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <LogoHeader />
      <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>🏆 랭킹</h1>

      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        {members.length === 0 ? (
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

      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default RankingPage;
