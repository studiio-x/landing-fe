import { axiosInstance } from "@/apis/axios";
import { GetProjectsResponse, GetProjectsParams } from "@/types/api/project.type";
import {
  getProjectsResponse,
  makeFolderParams,
  makeFolderResponse,
  postInviteFolderParams,
  postInviteFolderResponse,
  getInvitedFoldersResponse,
  updateInvitedUserParams,
  moveFolderParams,
} from "@/types/api/project.type";

//폴더 이동
export const moveFolder = async (params: moveFolderParams): Promise<void> => {
  await axiosInstance.put(`/folder/${params.folderId}/${params.newFolderId}`);
};

// 폴더 전체 목록 조회
export const getProjects = async (): Promise<getProjectsResponse> => {
  const response = await axiosInstance.get<getProjectsResponse>("/folder");
  return response.data;
};

//특정 폴더 안 프로젝트 목록 조회
export const getProjectsInFolder = async (
  folderId: number,
  params: Omit<GetProjectsParams, 'folderId'>,
): Promise<GetProjectsResponse> => {
  const response = await axiosInstance.get<GetProjectsResponse>(
    `/project/${folderId}`,
    { params: { pageNum: params.pageNum, limit: params.limit, sort: params.sort ?? "DESC" } },
  );
  return response.data;
};

// 폴더 생성
export const makefolder = async (
  params: makeFolderParams,
): Promise<makeFolderResponse> => {
  const response = await axiosInstance.post<makeFolderResponse>(
    `/folder/${params.rootFolderId}`,
    {
      name: params.folderName,
    },
  );

  return response.data;
};

// 폴더 사용자 초대
export const postInviteFolder = async (
  params: postInviteFolderParams,
): Promise<void> => {
  await axiosInstance.post<postInviteFolderResponse>(
    `/folder/manager/${params.folderId}`,
    {
      email: params.email,
    },
  );
};

// 초대된 사용자 목록 조회
export const getInvitedFolders = async (
  folderId: number,
): Promise<getInvitedFoldersResponse> => {
  const response = await axiosInstance.get<getInvitedFoldersResponse>(
    `/folder/manager/${folderId}`,
  );
  return response.data;
};

// 초대된 사용자 권한 업데이트
export const updateUserPermission = async (
  params: updateInvitedUserParams,
): Promise<void> => {
  await axiosInstance.put(
    `/folder/manager/${params.folderId}/${params.userId}?permission=${params.permission}`,
  );
};

//폴더 이름 변경
export const updateFolderName = async (
  folderId: number,
  newName: string,
): Promise<void> => {
  await axiosInstance.put(`/folder/${folderId}/name`, {
    name: newName,
  });
};

//폴더 삭제
export const deleteFolder = async (folderId: number): Promise<void> => {
  await axiosInstance.delete(`/folder/${folderId}`);
};
