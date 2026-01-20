import {
  GetTemplatesByCategoryParams,
  GetTemplatesByCategoryResponse,
  GetTemplatesByKeywordParams,
  GetTemplatesByKeywordResponse,
} from "@/types/dashboard/template/templateApi.type";
import { axiosInstance } from "@/apis/axios";

export const getTemplatesByKeyword = async (
  params: GetTemplatesByKeywordParams,
): Promise<GetTemplatesByKeywordResponse> => {
  const response = await axiosInstance.get<GetTemplatesByKeywordResponse>(
    "/templates/keyword",
    {
      params,
    },
  );

  return response.data;
};

export const getTemplatesByCategory = async (
  params: GetTemplatesByCategoryParams,
): Promise<GetTemplatesByCategoryResponse> => {
  const response = await axiosInstance.get<GetTemplatesByCategoryResponse>(
    "/templates/category",
    {
      params,
    },
  );

  return response.data;
};
