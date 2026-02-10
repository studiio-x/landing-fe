import { axiosInstance } from "@/apis/axios";
import {
  GetTemplatesByCategoryParams,
  GetTemplatesByCategoryResponse,
  GetTemplatesByKeywordParams,
  GetTemplatesByKeywordResponse,
} from "@/types/api/template.type";

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
