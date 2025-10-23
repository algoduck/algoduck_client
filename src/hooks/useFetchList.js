import { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";

const useFetchList = (baseUrl, params = {}) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      try {
        // ✅ 검색 중인지 판별
        const isSearching =
          typeof params.type === "string" &&
          params.type.trim() !== "" &&
          typeof params.query === "string" &&
          params.query.trim() !== "";

        // ✅ URL 결정
        const requestUrl = isSearching
          ? baseUrl.endsWith("/search")
            ? baseUrl
            : `${baseUrl}/search`
          : baseUrl;

        // ✅ 빈 문자열 파라미터 제거
        const cleanedParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v !== "" && v !== null && v !== undefined)
        );

        // ✅ 요청 전송
        const { data } = await AxiosInstance.get(requestUrl, {
          params: cleanedParams
        });

        if (data.success) {
          const content = data.data.problems || data.data.members || data.data.submissions || [];
          setData(content);
          setTotalCount(data.data.totalCount || 0);
        } else {
          setError("데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("useFetchList Error:", err);
        setError("오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [baseUrl, JSON.stringify(params)]);

  return { data, totalCount, isLoading, error };
};

export default useFetchList;
