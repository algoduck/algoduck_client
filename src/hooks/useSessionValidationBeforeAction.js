import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosInstance from "../common/AxiosInstance";
import { logout } from "../store/slices/authSlice";

const useSessionValidationBeforeAction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateSession = async () => {
    try {
      await AxiosInstance.get("/members/me");
      return true; // 세션 살아있음
    } catch (err) {
      if (err.response?.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("member");
        dispatch(logout());
        navigate("/login");
        return false;
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
