import { axiosInstance } from "@/apis/axios";
import {
  GetTemplatesByCategoryParams,
  GetTemplatesByCategoryResponse,
  GetTemplatesByKeywordParams,
  GetTemplatesByKeywordResponse,
  GetTemplateKeywordsResponse,
  SearchTemplatesParams,
  SearchTemplatesResponse,
} from "@/types/api/template.type";

export const getTemplateKeywords =
  async (): Promise<GetTemplateKeywordsResponse> => {
    const response = await axiosInstance.get<GetTemplateKeywordsResponse>(
      "/templates/template-keywords",
    );

    return response.data;
  };

export const getSearchTemplates = async (
  params: SearchTemplatesParams,
): Promise<SearchTemplatesResponse> => {
  const response = await axiosInstance.get<SearchTemplatesResponse>(
    "/templates/search",
    { params },
  );

  return response.data;
};

export const getTemplatesByKeyword = async (
  params: GetTemplatesByKeywordParams,
): Promise<GetTemplatesByKeywordResponse[]> => {
  const response = await axiosInstance.get<GetTemplatesByKeywordResponse[]>(
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
