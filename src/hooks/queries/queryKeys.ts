import {
  GetTemplatesByCategoryParams,
  GetTemplatesByKeywordParams,
  SearchTemplatesParams,
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

    search: () => [...queryKeys.templates.all, "search"] as const,
    searchList: (params: SearchTemplatesParams) =>
      [...queryKeys.templates.search(), params] as const,

    templateKeywords: () =>
      [...queryKeys.templates.all, "templateKeywords"] as const,
  },

  mypage: {
    all: ["mypage"] as const,
    detail: () => [...queryKeys.mypage.all, "detail"] as const,
    profileUploadUrl: () =>
      [...queryKeys.mypage.all, "profileUploadUrl"] as const,
  },

  image: {
    all: ["image"] as const,
    detail: (imageId: number) =>
      [...queryKeys.image.all, imageId] as const,
    rawPresign: () => [...queryKeys.image.all, "rawPresign"] as const,
  },
} as const;
