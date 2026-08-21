import { axiosInstance } from "@/apis/axios";
import {
  GetProjectsResponse,
  GetProjectsParams,
} from "@/types/api/project.type";

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
