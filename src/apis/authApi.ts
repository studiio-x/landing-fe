import { axiosInstance } from "@/apis/axios";
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  SendVerificationEmailRequest,
  EmailValidationResponse,
  PasswordEmailVerificationRequest,
  PasswordCodeVerificationRequest,
  PasswordResetRequest,
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

// 비밀번호 재설정 이메일 인증 요청
export const sendPasswordEmailVerification = async (
  body: PasswordEmailVerificationRequest,
): Promise<void> => {
  await axiosInstance.post("/auth/password/email/verification", body);
};

// 비밀번호 재설정 코드 인증
export const verifyPasswordCode = async (
  body: PasswordCodeVerificationRequest,
): Promise<void> => {
  await axiosInstance.post("/auth/password/code/verification", body);
};

// 비밀번호 변경
export const resetPassword = async (
  body: PasswordResetRequest,
): Promise<void> => {
  await axiosInstance.put("/auth/password", body);
};
