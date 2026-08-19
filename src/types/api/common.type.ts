export interface PageInfo {
  pageNum: number;
  limit: number;
  totalPages: number;
  totalElements: number;
}

export type SortOrder = "ASC" | "DESC";