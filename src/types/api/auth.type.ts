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
  accessToken: string;
  refreshToken: string;
}

// 이메일 인증 확인 (GET)
export interface VerifyEmailParams {
  email: string;
  token: string;
}

// 이메일 인증 요청 (POST)
export interface SendVerificationEmailRequest {
  email: string;
  callbackUrl: string;
}
