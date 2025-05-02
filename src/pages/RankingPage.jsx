import React, { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";
import LogoHeader from "../common/LogoHeader";
import { Link } from "react-router-dom";

const RankingPage = () => {
  const [members, setMembers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 100;

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
    if (pageNumber * pageSize < totalCount) setPageNumber(pageNumber + 1);
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
                    <strong>{(pageNumber - 1) * pageSize + index + 1}위</strong> - {member.nickname}{" "}
                    ({member.loginId})<br />
                    <span>푼 문제 수: {member.solved}</span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={handlePrev} disabled={pageNumber <= 1} style={{ margin: "0 10px" }}>
          ◀ 이전
        </button>
        <span>페이지 {pageNumber}</span>
        <button
          onClick={handleNext}
          disabled={pageNumber * pageSize >= totalCount}
          style={{ margin: "0 10px" }}
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
};

export default RankingPage;
