import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (!isAxiosError(error)) return fallback;
  return error.response?.data?.reason ?? fallback;
};
