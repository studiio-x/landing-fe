// 구글 로그인 URL 요청
export interface GoogleOAuthUrlParams {
  redirectUrl: string;
}

// 구글 로그인 URL 응답
export interface GoogleOAuthUrlResponse {
  url: string;
}
