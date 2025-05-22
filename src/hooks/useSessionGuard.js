import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const useSessionGuard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
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

    checkSession();
  }, [navigate, dispatch]);
};

export default useSessionGuard;
