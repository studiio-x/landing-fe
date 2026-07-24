import { PageInfo, SortOrder } from "./common.type";

export interface ProjectItem {
  projectId: number;
  title: string;
  thumbnailObjectKey: string;
}

export interface GetProjectsResponse {
  projects: ProjectItem[];
  pageInfo: PageInfo;
}

export interface GetProjectsParams {
  folderId: number;
  pageNum: number;
  limit: number;
  sort?: SortOrder;
}
