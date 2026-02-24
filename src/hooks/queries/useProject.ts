import {
  getInvitedFolders,
  getProjects,
  makefolder,
  postInviteFolder,
} from "@/apis/projectApi";
import {
  makeFolderParams,
  postInviteFolderParams,
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

export const useGetInvitedFolders = (folderId: number, enabled: boolean = true) =>
  useQuery({
    queryKey: ["invitedFolders", folderId],
    queryFn: () => getInvitedFolders(folderId),
    enabled: enabled && !!folderId,
  });
