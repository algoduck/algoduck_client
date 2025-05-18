import { useEffect, useState } from "react";
import AxiosInstance from "../common/AxiosInstance";

const useFetchList = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      try {
        const { data } = await AxiosInstance.get(url, { params });
        if (data.success) {
          setData(data.data.problems || data.data.members || []);
          setTotalCount(data.data.totalCount || 0);
        } else {
          setError("데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err);
        setError("오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [url, JSON.stringify(params)]); // param 변경 시 refetch

  return { data, totalCount, isLoading, error };
};

export default useFetchList;
