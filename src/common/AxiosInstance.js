// src/common/axiosInstance.js

import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

//  요청 실패 시 세션 만료 감지
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/members/login");

    console.log("url = ", error.config.url);

    if (error.response?.status == 401 && !isLoginRequest) {
      // alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("member");
      window.location.href = "/login"; // 또는 navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
