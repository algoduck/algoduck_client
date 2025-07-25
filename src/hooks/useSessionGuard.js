import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../common/AxiosInstance";
import { useDispatch } from "react-redux";
import { handleSessionLogout } from "../utils/session";

const useSessionGuard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await AxiosInstance.get("/members/me");
      } catch (err) {
        if (err.response?.status === 401) {
          await handleSessionLogout({ dispatch, navigate, silent: false });
        }
      }
    };

    checkSession();
  }, [navigate, dispatch]);
};

export default useSessionGuard;
