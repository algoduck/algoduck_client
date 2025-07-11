import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const useSessionGuard = (intervalMillis = 5 * 60 * 1000) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const memberJson = localStorage.getItem("member");
      if (!memberJson) return; // 로그인 안 돼있으면 아무것도 하지 않음

      try {
        await AxiosInstance.get("/members/me");
      } catch (err) {
        if (err.response?.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("member");
          dispatch(logout());
          navigate("/login");
        }
      }
    };

    checkSession(); //  첫 진입시 1회 검사
    const interval = setInterval(checkSession, intervalMillis);
    return () => clearInterval(interval);
  }, [navigate, dispatch, intervalMillis]);
};

export default useSessionGuard;
