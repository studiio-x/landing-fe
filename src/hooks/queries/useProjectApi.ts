import { useQuery } from "@tanstack/react-query";

import { getFolderDetail } from "@/apis/folderApi";
import { getProjectsInFolder } from "@/apis/projectApi";
import { queryKeys } from "./queryKeys";
import type { SortOrder } from "@/types/api/common.type";

export const useGetProjects = (folderId: number, pageNum = 0, limit = 12) =>
  useQuery({
    queryKey: queryKeys.project.list(folderId, pageNum, limit),
    queryFn: () => getFolderDetail({ folderId, pageNum, limit }),
    enabled: !!folderId,
  });

export const useGetProjectsInFolder = (
  folderId: number,
  pageNum = 0,
  limit = 12,
  sort?: SortOrder,
) =>
  useQuery({
    queryKey: ["projectsInFolder", folderId, pageNum, limit, sort],
    queryFn: () => getProjectsInFolder(folderId, { pageNum, limit, sort }),
    enabled: !!folderId,
  });
