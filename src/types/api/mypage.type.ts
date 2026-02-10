// 마이페이지 정보 응답
export interface GetMypageResponse {
  userId: number;
  username: string;
  email: string;
  profileImage: string;
}

// username 업데이트 요청
export interface UpdateUsernameRequest {
  username: string;
}

// 프로필 업로드 URL 응답
export interface GetProfileUploadUrlResponse {
  uploadUrl: string;
  objectKey: string;
}

// 프로필 이미지 업데이트 요청
export interface UpdateProfileImageRequest {
  profileImage: string;
}
