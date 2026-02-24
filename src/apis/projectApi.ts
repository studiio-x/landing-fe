import { axiosInstance } from "@/apis/axios";
import {
  getProjectsResponse,
  makeFolderParams,
  makeFolderResponse,
  postInviteFolderParams,
  postInviteFolderResponse,
  getInvitedFoldersResponse,
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

export const postInviteFolder = async (
  params: postInviteFolderParams,
): Promise<void> => {
  await axiosInstance.post<postInviteFolderResponse>(
    `/folder/manager/${params.folderId}`,
    {
      email: params.email,
    },
  );
};

export const getInvitedFolders = async (
  folderId: number,
): Promise<getInvitedFoldersResponse> => {
  const response = await axiosInstance.get<getInvitedFoldersResponse>(
    `/folder/manager/${folderId}`,
  );
  return response.data;
};
