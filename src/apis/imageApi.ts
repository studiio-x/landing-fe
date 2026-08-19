import { axiosInstance } from "@/apis/axios";
import {
  PostCutoutImageRequest,
  PostCutoutImageResponse,
  PostImageRequest,
  PostImageResponse,
  GetImageResponse,
  GetRawPresignResponse,
  GetCustomTemplatePresignResponse,
  PostCustomBackgroundImageRequest,
  PostCustomBackgroundImageResponse,
} from "@/types/api/image.type";

export const getRawPresign = async (): Promise<GetRawPresignResponse> => {
  const response =
    await axiosInstance.get<GetRawPresignResponse>("/s3/presign/raw")
  return response.data;
};

export const getCustomTemplatePresign =
  async (): Promise<GetCustomTemplatePresignResponse> => {
    const response = await axiosInstance.get<GetCustomTemplatePresignResponse>(
      "/custom-template",
    );
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

export const postCustomBackgroundImage = async (
  body: PostCustomBackgroundImageRequest,
): Promise<PostCustomBackgroundImageResponse> => {
  const response = await axiosInstance.post<PostCustomBackgroundImageResponse>(
    "/image/custom-background",
    body,
  );

  return response.data;
};
