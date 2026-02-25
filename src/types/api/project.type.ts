export interface getProjectsResponse {
  myProject: {
    folderId: number;
    name: string;
  }[];
  sharedProject: {
    folderId: number;
    name: string;
  }[];
}

export interface makeFolderParams {
  rootFolderId: number;
  folderName: string;
}

export interface makeFolderResponse {
  folderId: number;
}

export interface postInviteFolderParams {
  folderId: number;
  email: string;
}

export interface postInviteFolderResponse {
  success: boolean;
}

export type Permission = "WRITE" | "READ" | "FULL_ACCESS" | "OWNER";

export interface Manager {
  userId: number;
  profileUrl: string;
  username: string;
  email: string;
  permission: Permission;
}

export interface getInvitedFoldersResponse {
  myPermission: {
    permission: Permission;
    canWrite: boolean;
  };
  managers: Manager[];
}

export interface updateInvitedUserParams {
  folderId: number;
  userId: number;
  permission: Permission;
}

export interface moveFolderParams {
  folderId: number;
  newFolderId: number;
}
