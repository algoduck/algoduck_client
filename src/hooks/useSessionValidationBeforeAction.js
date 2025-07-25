import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosInstance from "../common/AxiosInstance";
import { handleSessionLogout } from "../utils/session";

const useSessionValidationBeforeAction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateSession = async () => {
    try {
      await AxiosInstance.get("/members/me");
      return true; // 세션 살아있음
    } catch (err) {
      if (err.response?.status === 401) {
        await handleSessionLogout({ dispatch, navigate, silent: false });
      } else {
        console.error("세션 확인 중 에러:", err);
        alert("예기치 못한 오류가 발생했습니다.");
        return false;
      }
    }
  };

  return validateSession;
};

export default useSessionValidationBeforeAction;
