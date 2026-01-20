import { PageInfo } from "@/types/common/page.type";

// 템플릿 키워드 타입
export type TemplateKeyword = "GENERAL_DISPLAY" | "FABRIC_VELVET" | "OUTDOOR";

// 템플릿 카테고리 타입
export type TemplateCategory = "MODEL" | "STUDIO" | "IMAGE" | "VIDEO";

// 키워드 기준 템플릿 아이템
export interface TemplateItem {
  templateId: number;
  keyword: TemplateKeyword;
  keywordTitle: string;
  imageUrl: string;
  category: TemplateCategory;
}

// 카테고리 기준 템플릿 아이템
export interface TemplateCategoryItem {
  templateId: number;
  imageUrl: string;
}

// 키워드 기준 템플릿 조회
export interface GetTemplatesByKeywordParams {
  keyword: TemplateKeyword;
  pageNum: number;
  limit: number;
}

export interface GetTemplatesByKeywordResponse {
  templates: TemplateItem[];
  pageInfo: PageInfo;
}

// 카테고리 기준 템플릿 조회
export interface GetTemplatesByCategoryParams {
  category: TemplateCategory;
  pageNum: number;
  limit: number;
}

export interface GetTemplatesByCategoryResponse {
  templates: TemplateCategoryItem[];
  pageInfo: PageInfo;
}
