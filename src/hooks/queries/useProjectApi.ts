import { useQuery } from "@tanstack/react-query";

import { getFolderDetail } from "@/apis/folderApi";
import { queryKeys } from "./queryKeys";

export const useGetProjects = (folderId: number, pageNum = 0, limit = 12) =>
  useQuery({
    queryKey: queryKeys.project.list(folderId, pageNum, limit),
    queryFn: () => getFolderDetail({ folderId, pageNum, limit }),
    enabled: !!folderId,
  });
