import { axiosInstance } from "@/apis/axios";
import {
  PostCutoutImageRequest,
  PostCutoutImageResponse,
  PostImageRequest,
  PostImageResponse,
  GetImageResponse,
  GetRawPresignResponse,
} from "@/types/api/image.type";

export const getRawPresign = async (): Promise<GetRawPresignResponse> => {
  const response =
    await axiosInstance.get<GetRawPresignResponse>("/image/raw/presign");

  return response.data;
};

export const postCutoutImage = async (
  body: PostCutoutImageRequest,
): Promise<PostCutoutImageResponse> => {
  const response = await axiosInstance.post<PostCutoutImageResponse>(
    "/image/cutout",
    body,
  );

  return response.data;
};

export const postImage = async (
  body: PostImageRequest,
): Promise<PostImageResponse> => {
  const response = await axiosInstance.post<PostImageResponse>("/image", body);

  return response.data;
};

export const getImage = async (imageId: number): Promise<GetImageResponse> => {
  const response = await axiosInstance.get<GetImageResponse>(
    `/image/${imageId}`,
  );

  return response.data;
};
