import { axiosInstance } from "@/apis/axios";
import { getProjectsResponse } from "@/types/api/project.type";

export const getProjects = async (): Promise<getProjectsResponse> => {
  const response = await axiosInstance.get<getProjectsResponse>("/folder");
  return response.data;
};
