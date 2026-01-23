import { useQuery } from "@tanstack/react-query";

import {
  getTemplatesByCategory,
  getTemplatesByKeyword,
} from "@/apis/templateApi";

import { queryKeys } from "./queryKeys";
import {
  GetTemplatesByCategoryParams,
  GetTemplatesByKeywordParams,
} from "@/types/api/template.type";

export const useTemplatesByKeyword = (params: GetTemplatesByKeywordParams) =>
  useQuery({
    queryKey: queryKeys.templates.keywordList(params),
    queryFn: () => getTemplatesByKeyword(params),
  });

export const useTemplatesByCategory = (
  params: GetTemplatesByCategoryParams,
  enabled = true
) =>
  useQuery({
    queryKey: queryKeys.templates.categoryList(params),
    queryFn: () => getTemplatesByCategory(params),
    enabled,
  });
