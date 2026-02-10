import { axiosInstance } from "@/apis/axios";
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  VerifyEmailParams,
  SendVerificationEmailRequest,
} from "@/types/api/auth.type";

// 토큰 갱신
export const refreshToken = async (): Promise<void> => {
  await axiosInstance.post("/auth/token");
};

// 회원가입
export const signup = async (body: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/auth/signup",
    body,
  );

  return response.data;
};

// 로그인
export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", body);
  return response.data;
};

// 이메일 인증 요청
export const sendVerificationEmail = async (
  body: SendVerificationEmailRequest,
): Promise<void> => {
  await axiosInstance.post("/auth/email/verification", body);
};
