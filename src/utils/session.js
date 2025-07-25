import { logout } from "../store/slices/authSlice";
import AxiosInstance from "../common/AxiosInstance";

export const handleSessionLogout = async ({ dispatch, navigate, silent = false }) => {
  try {
    await AxiosInstance.post("/members/logout", null, { withCredentials: true });
  } catch (e) {
    console.warn("서버 로그아웃 실패", e);
  } finally {
    if (!silent) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
    localStorage.removeItem("member");
    dispatch(logout());
    navigate("/login");
  }
};
