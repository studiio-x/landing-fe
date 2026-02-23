import { getProjects, makefolder } from "@/apis/projectApi";
import { makeFolderParams } from "@/types/api/project.type";
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
