import {
  GetTemplatesByCategoryParams,
  GetTemplatesByKeywordParams,
} from "@/types/api/template.type";

export const queryKeys = {
  templates: {
    all: ["templates"] as const,

    keyword: () => [...queryKeys.templates.all, "keyword"] as const,
    keywordList: (params: GetTemplatesByKeywordParams) =>
      [...queryKeys.templates.keyword(), params] as const,

    category: () => [...queryKeys.templates.all, "category"] as const,
    categoryList: (params: GetTemplatesByCategoryParams) =>
      [...queryKeys.templates.category(), params] as const,
  },
} as const;
