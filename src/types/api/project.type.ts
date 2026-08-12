import { PageInfo, SortOrder } from "./common.type";

export type ProjectFileType = "IMAGE" | "VIDEO";

export interface ProjectItem {
  projectId: number;
  title: string;
  thumbnailObjectKey: string | null;
  fileType: ProjectFileType;
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
