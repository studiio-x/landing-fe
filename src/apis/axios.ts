import axios from "axios";

import type { SuccessResponse } from "@/types/api/response.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

axiosInstance.interceptors.response.use((response) => {
  const body = response.data as SuccessResponse<unknown>;
  response.data = body.data;
  return response;
});
