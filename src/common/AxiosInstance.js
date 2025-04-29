// src/common/axiosInstance.js

import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default AxiosInstance;
