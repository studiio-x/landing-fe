import { axiosInstance } from "@/apis/axios";
import {
  GetFoldersResponse,
  GetFolderDetailResponse,
  GetFolderDetailParams,
} from "@/types/api/folder.type";
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

// GET /folder - 폴더 전체 목록 조회
export const getFolders = async (): Promise<GetFoldersResponse> => {
  const response = await axiosInstance.get<GetFoldersResponse>("/folder");
  return response.data;
};

// GET /folder/{folderId} - 특정 폴더 상세 조회
export const getFolderDetail = async ({
  folderId,
  pageNum,
  limit,
  sort = "DESC",
}: GetFolderDetailParams): Promise<GetFolderDetailResponse> => {
  const response = await axiosInstance.get<GetFolderDetailResponse>(
    `/folder/${folderId}`,
    {
      params: { pageNum, limit, sort },
    },
  );
  return response.data;
};

// PUT /folder/{targetFolderId}/{destinationFolderId} - 폴더 이동
export const moveFolder = async (params: moveFolderParams): Promise<void> => {
  await axiosInstance.put(`/folder/${params.folderId}/${params.newFolderId}`);
};

// POST /folder/{rootFolderId} - 폴더 생성
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

// POST /folder/manager/{folderId} - 폴더 사용자 초대
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

// GET /folder/manager/{folderId} - 초대된 사용자 목록 조회
export const getInvitedFolders = async (
  folderId: number,
): Promise<getInvitedFoldersResponse> => {
  const response = await axiosInstance.get<getInvitedFoldersResponse>(
    `/folder/manager/${folderId}`,
  );
  return response.data;
};

// PUT /folder/manager/{folderId}/{targetUserId} - 초대된 사용자 권한 업데이트
export const updateUserPermission = async (
  params: updateInvitedUserParams,
): Promise<void> => {
  await axiosInstance.put(
    `/folder/manager/${params.folderId}/${params.userId}?permission=${params.permission}`,
  );
};

// PUT /folder/{folderId}/name - 폴더 이름 변경
export const updateFolderName = async (
  folderId: number,
  newName: string,
): Promise<void> => {
  await axiosInstance.put(`/folder/${folderId}/name`, {
    name: newName,
  });
};

// PUT /folder/{folderId}/link - 상위 폴더 연결 해제
export const unlinkFolder = async (folderId: number): Promise<void> => {
  await axiosInstance.put(`/folder/${folderId}/link`);
};

// DELETE /folder/{folderId} - 폴더 삭제
export const deleteFolder = async (folderId: number): Promise<void> => {
  await axiosInstance.delete(`/folder/${folderId}`);
};
