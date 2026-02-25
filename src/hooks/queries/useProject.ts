import {
  getInvitedFolders,
  getProjects,
  makefolder,
  postInviteFolder,
  updateUserPermission,
  moveFolder,
  deleteFolder,
  updateFolderName,
} from "@/apis/projectApi";
import {
  makeFolderParams,
  postInviteFolderParams,
  updateInvitedUserParams,
  moveFolderParams,
} from "@/types/api/project.type";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useProject = () =>
  useQuery({
    queryKey: ["project"],
    queryFn: getProjects,
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

export const useDeleteFolder = () =>
  useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
  });

export const useUpdateFolderName = () =>
  useMutation({
    mutationFn: ({ folderId, newName }: { folderId: number; newName: string }) =>
      updateFolderName(folderId, newName),
  });
