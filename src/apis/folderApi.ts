import { axiosInstance } from "@/apis/axios";
import { GetFoldersResponse } from "@/types/api/folder.type";

export const getFolders = async (): Promise<GetFoldersResponse> => {
  const response = await axiosInstance.get<GetFoldersResponse>("/folder");
  return response.data;
};
