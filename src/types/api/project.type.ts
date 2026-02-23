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
