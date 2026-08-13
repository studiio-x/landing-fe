import axios from "axios";

import { BASE_URL } from "./config";
import type { SuccessResponse } from "@/types/api/response.type";
import { PATHS } from "@/constants/common/paths";
import { attachApiLogger } from "@/utils/apiLogger";
import { useSessionExpiredStore } from "@/stores/useSessionExpiredStore";

if (!BASE_URL) {
  throw new Error("API_BASE_URL이 정의되지 않았습니다");
}

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

attachApiLogger(axiosInstance);

axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data as SuccessResponse<unknown>;
    response.data = body.data;
    return response;
  },
  (error) => {
    if (
      error.response?.status === 403 &&
      !window.location.pathname.includes(PATHS.LOGIN) &&
      !window.location.pathname.includes(PATHS.SIGNUP) &&
      !window.location.pathname.includes(PATHS.PASSWORD_RESET)
    ) {
      const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
      // 바로 리다이렉트하지 않고, 세션 만료 안내 모달을 띄운 뒤 사용자가 확인하면 이동시킨다.
      useSessionExpiredStore
        .getState()
        .open(`${PATHS.LOGIN}?callbackUrl=${callbackUrl}`);
    }
    return Promise.reject(error);
  },
);
