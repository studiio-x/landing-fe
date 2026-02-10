import { axiosInstance } from "@/apis/axios";
import {
  GetMypageResponse,
  UpdateUsernameRequest,
  GetProfileUploadUrlResponse,
  UpdateProfileImageRequest,
} from "@/types/api/mypage.type";

// 마이페이지 정보 조회
export const getMypage = async (): Promise<GetMypageResponse> => {
  const response = await axiosInstance.get<GetMypageResponse>("/mypage");
  return response.data;
};

// username 업데이트
export const updateUsername = async (
  body: UpdateUsernameRequest,
): Promise<void> => {
  await axiosInstance.put("/mypage/username", body);
};

// 프로필 업로드 URL 가져오기
export const getProfileUploadUrl =
  async (): Promise<GetProfileUploadUrlResponse> => {
    const response =
      await axiosInstance.get<GetProfileUploadUrlResponse>("/mypage/profile");
    return response.data;
  };

// 프로필 이미지 업데이트
export const updateProfileImage = async (
  body: UpdateProfileImageRequest,
): Promise<void> => {
  await axiosInstance.put("/mypage/profile", body);
};
