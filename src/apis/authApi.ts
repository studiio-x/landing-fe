import { axiosInstance } from "@/apis/axios";
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  SendVerificationEmailRequest,
  EmailValidationResponse,
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

// 이메일 인증 여부 확인
export const checkEmailValidation = async (
  email: string,
): Promise<EmailValidationResponse> => {
  const response = await axiosInstance.get<EmailValidationResponse>(
    "/auth/email/validation",
    { params: { email } },
  );
  return response.data;
};
