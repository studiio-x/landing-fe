import { useQuery } from "@tanstack/react-query";

import { getProjects } from "@/apis/projectApi";
import { queryKeys } from "./queryKeys";

export const useGetProjects = (folderId: number, pageNum = 0, limit = 50) =>
  useQuery({
    queryKey: queryKeys.project.list(folderId, pageNum, limit),
    queryFn: () => getProjects({ folderId, pageNum, limit }),
    enabled: !!folderId,
  });
