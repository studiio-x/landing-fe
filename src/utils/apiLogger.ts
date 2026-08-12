import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const isDev = process.env.NODE_ENV !== "production";

type RequestConfigWithTimestamp = InternalAxiosRequestConfig & {
  _requestStartedAt?: number;
};

export const attachApiLogger = (instance: AxiosInstance) => {
  if (!isDev) return;

  instance.interceptors.request.use((config: RequestConfigWithTimestamp) => {
    config._requestStartedAt = Date.now();
    console.log(
      `%c[API] → ${config.method?.toUpperCase()} ${config.url}`,
      "color:#3b82f6;font-weight:bold;",
      config.params ?? config.data ?? "",
    );
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      const { _requestStartedAt } = response.config as RequestConfigWithTimestamp;
      const duration = _requestStartedAt ? `${Date.now() - _requestStartedAt}ms` : "";
      console.log(
        `%c[API] ← ${response.config.method?.toUpperCase()} ${response.config.url} ${response.status} ${duration}`,
        "color:#22c55e;font-weight:bold;",
        response.data,
      );
      return response;
    },
    (error: AxiosError) => {
      const config = error.config as RequestConfigWithTimestamp | undefined;
      const duration = config?._requestStartedAt ? `${Date.now() - config._requestStartedAt}ms` : "";
      console.warn(
        `%c[API] ✕ ${config?.method?.toUpperCase()} ${config?.url} ${error.response?.status ?? ""} ${duration}`,
        "color:#ef4444;font-weight:bold;",
        error.response?.data ?? error.message,
      );
      return Promise.reject(error);
    },
  );
};
