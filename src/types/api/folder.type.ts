export interface FolderItem {
  folderId: number;
  name: string;
}

export interface GetFoldersResponse {
  myProject: FolderItem[];
  sharedProject: FolderItem[];
}
