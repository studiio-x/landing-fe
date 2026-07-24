import { axiosInstance } from "@/apis/axios";
import { GetProjectsResponse, GetProjectsParams } from "@/types/api/project.type";

export const getProjects = async ({ folderId, pageNum, limit, sort = "DESC" }: GetProjectsParams): Promise<GetProjectsResponse> => {
  const response = await axiosInstance.get<GetProjectsResponse>(`/project/${folderId}`, {
    params: { pageNum, limit, sort },
  });
  return response.data;
};
