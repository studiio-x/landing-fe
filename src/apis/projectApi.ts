import { axiosInstance } from "@/apis/axios";
import {
  GetProjectsResponse,
  GetProjectsParams,
  GetProjectImagesResponse,
} from "@/types/api/project.type";
import type { SortOrder } from "@/types/api/common.type";

// GET /project/{folderId} - 특정 폴더 안 프로젝트 목록 조회
export const getProjectsInFolder = async (
  folderId: number,
  params: Omit<GetProjectsParams, "folderId">,
): Promise<GetProjectsResponse> => {
  const response = await axiosInstance.get<GetProjectsResponse>(
    `/project/${folderId}`,
    {
      params: {
        pageNum: params.pageNum,
        limit: params.limit,
        sort: params.sort ?? "DESC",
      },
    },
  );
  return response.data;
};

// GET /project/{projectId}/images - 프로젝트 내 이미지 목록 조회
export const getProjectImages = async (
  projectId: number,
  params: { pageNum: number; limit: number; sort?: SortOrder },
): Promise<GetProjectImagesResponse> => {
  const response = await axiosInstance.get<GetProjectImagesResponse>(
    `/project/${projectId}/images`,
    {
      params: {
        pageNum: params.pageNum,
        limit: params.limit,
        sort: params.sort ?? "DESC",
      },
    },
  );
  return response.data;
};
