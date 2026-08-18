// 회원가입 요청
export interface SignupRequest {
  email: string;
  password: string;
}

// 회원가입 응답
export interface SignupResponse {
  userId: number;
  email: string;
  profileImageUrl: string;
  accessToken: string;
  refreshToken: string;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  userId: number;
  email: string;
  profileImageUrl: string;
}

// 이메일 인증 확인 응답
export interface EmailValidationResponse {
  email: string;
  isVerified: boolean;
}

// 이메일 인증 요청 (POST)
export interface SendVerificationEmailRequest {
  email: string;
  callbackUrl: string;
}

// 비밀번호 재설정 이메일 인증 요청
export interface PasswordEmailVerificationRequest {
  email: string;
}

// 비밀번호 재설정 코드 인증 요청
export interface PasswordCodeVerificationRequest {
  email: string;
  code: string;
}

// 비밀번호 변경 요청
export interface PasswordResetRequest {
  email: string;
  password: string;
}
