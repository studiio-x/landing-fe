import { axiosInstance } from "@/apis/axios";
import {
  GoogleOAuthUrlParams,
  GoogleOAuthUrlResponse,
} from "@/types/api/oauth.type";

// Google OAuth 시작 URL 가져오기
export const getGoogleOAuthUrl = async (
  params: GoogleOAuthUrlParams,
): Promise<string> => {
  const response = await axiosInstance.get<GoogleOAuthUrlResponse>(
    "/oauth/google",
    { params },
  );
  return response.data.url;
};
