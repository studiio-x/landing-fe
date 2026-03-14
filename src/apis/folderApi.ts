import { axiosInstance } from "@/apis/axios";
import { GetFoldersResponse, GetFolderDetailResponse, GetFolderDetailParams } from "@/types/api/folder.type";

export const getFolders = async (): Promise<GetFoldersResponse> => {
  const response = await axiosInstance.get<GetFoldersResponse>("/folder");
  return response.data;
};

export const getFolderDetail = async ({ folderId, pageNum, limit, sort = "DESC" }: GetFolderDetailParams): Promise<GetFolderDetailResponse> => {
  const response = await axiosInstance.get<GetFolderDetailResponse>(`/folder/${folderId}`, {
    params: { pageNum, limit, sort },
  });
  return response.data;
};
