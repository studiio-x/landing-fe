export interface SuccessResponse<T> {
  status: number;
  message: string;
  data: T | null;
}

export interface ErrorResponse {
  success: false;
  code: string;
  status: string;
  reason: string;
  errors: Record<string, string> | null;
  timestamp: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
