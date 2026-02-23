export interface getProjectsResponse {
  myProject: [
    {
      folderId: number;
      name: string;
    },
  ];
  sharedProject: [
    {
      folderId: number;
      name: string;
    },
  ];
}

export interface makeFolderParams {
  rootFolderId: number;
  folderName: string;
}

export interface makeFolderResponse {
  status?: number;
  message?: string;
}
