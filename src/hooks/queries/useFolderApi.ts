import { useQuery } from "@tanstack/react-query";

import { getFolders, getFolderDetail } from "@/apis/folderApi";
import { queryKeys } from "./queryKeys";

export const useGetFolders = () =>
  useQuery({
    queryKey: queryKeys.folder.list(),
    queryFn: getFolders,
  });

export const useGetFolderDetail = (folderId: number, pageNum = 1, limit = 10) =>
  useQuery({
    queryKey: queryKeys.folder.detail(folderId),
    queryFn: () => getFolderDetail({ folderId, pageNum, limit }),
    enabled: !!folderId,
  });
