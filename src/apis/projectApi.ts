import { axiosInstance } from "@/apis/axios";
import {
  getProjectsResponse,
  makeFolderParams,
  makeFolderResponse,
} from "@/types/api/project.type";

export const getProjects = async (): Promise<getProjectsResponse> => {
  const response = await axiosInstance.get<getProjectsResponse>("/folder");
  return response.data;
};

export const makefolder = async (
  params: makeFolderParams,
): Promise<makeFolderResponse> => {
  const response = await axiosInstance.post<makeFolderResponse>(
    `/folder/${params.rootFolderId}`,
    {
      name: params.folderName,
    },
  );

  return response.data;
};
