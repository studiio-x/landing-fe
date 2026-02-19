import axios from "axios";

import { BASE_URL } from "./config";
import type { SuccessResponse } from "@/types/api/response.type";
import { PATHS } from "@/constants/common/paths";

if (!BASE_URL) {
  throw new Error("API_BASE_URL이 정의되지 않았습니다");
}

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 20000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data as SuccessResponse<unknown>;
    response.data = body.data;
    return response;
  },
  (error) => {
    if (error.response?.status === 403 && !window.location.pathname.includes(PATHS.LOGIN)) {
      window.location.href = PATHS.LOGIN;
    }
    return Promise.reject(error);
  },
);
