import { axiosInstance } from "@/apis/axios";
import {
  GetVideoImagePresignResponse,
  PostVideoParams,
  PostVideoRequest,
  PostVideoResponse,
} from "@/types/api/video.type";

export const getVideoImagePresign =
  async (): Promise<GetVideoImagePresignResponse> => {
    const response = await axiosInstance.get<GetVideoImagePresignResponse>(
      "/videos/images",
    );
    return response.data;
  };

export const postVideo = async (
  params: PostVideoParams,
  body: PostVideoRequest,
): Promise<PostVideoResponse> => {
  const response = await axiosInstance.post<PostVideoResponse>(
    "/videos",
    body,
    { params },
  );

  return response.data;
};
