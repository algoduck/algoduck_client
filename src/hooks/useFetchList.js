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
        const isSearching = params.type && params.query;

        // ✅ baseUrl 기준으로 검색 URL 구성
        const requestUrl = isSearching
          ? baseUrl.endsWith("/search")
            ? baseUrl
            : `${baseUrl}/search`
          : baseUrl;

        // ✅ 요청 전송
        const { data } = await AxiosInstance.get(requestUrl, { params });

        if (data.success) {
          // problems, members 모두 지원
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
  }, [baseUrl, JSON.stringify(params)]); // param 변경 시 refetch

  return { data, totalCount, isLoading, error };
};

export default useFetchList;
