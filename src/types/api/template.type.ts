import { PageInfo } from "@/types/api/common.type";

// 템플릿 키워드 타입
export type TemplateKeyword = "GENERAL_DISPLAY" | "FABRIC_VELVET" | "OUTDOOR";

// 템플릿 카테고리 타입
export type TemplateCategory = "MODEL" | "STUDIO";

// 키워드 기준 템플릿 아이템
export interface TemplateItem {
  templateId: number;
  keywordType: TemplateKeyword;
  imageObjectKey: string;
  category: TemplateCategory;
  keywordTitle: string;
}

// 카테고리 기준 템플릿 아이템
export interface TemplateCategoryItem {
  templateId: number;
  imageUrl: string;
}

// 키워드 기준 템플릿 조회
export interface GetTemplatesByKeywordParams {
  keywords: TemplateKeyword[];
  limitPerKeyword: number;
}

export interface GetTemplatesByKeywordResponse {
  keyword: TemplateKeyword;
  keywordTitle: string;
  templates: TemplateItem[];
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

// 템플릿 검색 아이템
export type TemplateSearchItem = TemplateItem;

// 템플릿 검색
export interface SearchTemplatesParams {
  keyword: string;
}

export type SearchTemplatesResponse = TemplateSearchItem[];

// 템플릿 키워드 목록 아이템
export interface TemplateKeywordItem {
  keyword: TemplateKeyword;
  title: string;
}

export type GetTemplateKeywordsResponse = TemplateKeywordItem[];
