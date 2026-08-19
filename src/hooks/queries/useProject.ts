import {
  getInvitedFolders,
  getFolders,
  getFolderDetail,
  makefolder,
  postInviteFolder,
  updateUserPermission,
  moveFolder,
  deleteFolder,
  updateFolderName,
} from "@/apis/folderApi";
import { GetFolderDetailParams } from "@/types/api/folder.type";
import {
  makeFolderParams,
  postInviteFolderParams,
  updateInvitedUserParams,
  moveFolderParams,
} from "@/types/api/project.type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProject = () =>
  useQuery({
    queryKey: ["project"],
    queryFn: getFolders,
  });

export const useMakeFolder = () =>
  useMutation({
    mutationFn: (params: makeFolderParams) => makefolder(params),
  });

export const useInviteFolder = () =>
  useMutation({
    mutationFn: (params: postInviteFolderParams) => postInviteFolder(params),
  });

export const useGetInvitedFolders = (
  folderId: number,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: ["invitedFolders", folderId],
    queryFn: () => getInvitedFolders(folderId),
    enabled: enabled && !!folderId,
  });

export const useUpdateUserPermission = () => {
  return useMutation({
    mutationFn: (params: updateInvitedUserParams) =>
      updateUserPermission(params),
  });
};

export const useMoveFolder = () =>
  useMutation({
    mutationFn: (params: moveFolderParams) => moveFolder(params),
  });

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["folderDetail"] });
    },
  });
};

export const useUpdateFolderName = () =>
  useMutation({
    mutationFn: ({
      folderId,
      newName,
    }: {
      folderId: number;
      newName: string;
    }) => updateFolderName(folderId, newName),
  });

export const useFolderDetail = (
  folderId: number,
  params?: Omit<GetFolderDetailParams, "folderId">,
) =>
  useQuery({
    queryKey: ["folderDetail", folderId, params?.pageNum, params?.limit, params?.sort],
    queryFn: () =>
      getFolderDetail({
        folderId,
        pageNum: params?.pageNum ?? 0,
        limit: params?.limit ?? 12,
        sort: params?.sort ?? "DESC",
      }),
    enabled: !!folderId,
  });
