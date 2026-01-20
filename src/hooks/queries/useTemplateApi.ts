import { useQuery } from "@tanstack/react-query";

import type {
  GetTemplatesByKeywordParams,
  GetTemplatesByCategoryParams,
} from "@/types/dashboard/template/templateApi.type";

import {
  getTemplatesByCategory,
  getTemplatesByKeyword,
} from "@/apis/template/templateApi";

import { queryKeys } from "./queryKeys";

export const useTemplatesByKeyword = (params: GetTemplatesByKeywordParams) =>
  useQuery({
    queryKey: queryKeys.templates.keywordList(params),
    queryFn: () => getTemplatesByKeyword(params),
  });

export const useTemplatesByCategory = (params: GetTemplatesByCategoryParams) =>
  useQuery({
    queryKey: queryKeys.templates.categoryList(params),
    queryFn: () => getTemplatesByCategory(params),
  });
