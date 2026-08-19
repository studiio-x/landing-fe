import { PageInfo, SortOrder } from "./common.type";

export interface FolderItem {
  folderId: number;
  name: string;
}

export interface GetFoldersResponse {
  myProject: FolderItem[];
  sharedProject: FolderItem[];
}

export interface FolderDetailItem {
  folderId: number;
  folderName: string;
  images: string[];
}

export interface GetFolderDetailResponse {
  folders: FolderDetailItem[];
  pageInfo: PageInfo;
}

export interface GetFolderDetailParams {
  folderId: number;
  pageNum: number;
  limit: number;
  sort?: SortOrder;
}
