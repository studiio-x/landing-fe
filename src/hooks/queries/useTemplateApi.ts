import { useQuery } from "@tanstack/react-query";

import {
  getTemplatesByCategory,
  getTemplatesByKeyword,
  getSearchTemplates,
  getTemplateKeywords,
} from "@/apis/templateApi";

import { queryKeys } from "./queryKeys";
import {
  GetTemplatesByCategoryParams,
  GetTemplatesByKeywordParams,
  SearchTemplatesParams,
} from "@/types/api/template.type";

export const useTemplatesByKeyword = (params: GetTemplatesByKeywordParams) =>
  useQuery({
    queryKey: queryKeys.templates.keywordList(params),
    queryFn: () => getTemplatesByKeyword(params),
  });

export const useTemplatesByCategory = (
  params: GetTemplatesByCategoryParams,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: queryKeys.templates.categoryList(params),
    queryFn: () => getTemplatesByCategory(params),
    enabled,
  });

export const useSearchTemplates = (params: SearchTemplatesParams) =>
  useQuery({
    queryKey: queryKeys.templates.searchList(params),
    queryFn: () => getSearchTemplates(params),
  });

export const useTemplateKeywords = () =>
  useQuery({
    queryKey: queryKeys.templates.templateKeywords(),
    queryFn: () => getTemplateKeywords(),
  });
