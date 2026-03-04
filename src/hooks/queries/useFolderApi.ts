import { useQuery } from "@tanstack/react-query";

import { getFolders } from "@/apis/folderApi";
import { queryKeys } from "./queryKeys";

export const useGetFolders = () =>
  useQuery({
    queryKey: queryKeys.folder.list(),
    queryFn: getFolders,
  });
