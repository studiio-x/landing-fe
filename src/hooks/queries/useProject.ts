import { getProjects } from "@/apis/projectApi";
import { useQuery } from "@tanstack/react-query";

export const useProject = () =>
  useQuery({
    queryKey: ["project"],
    queryFn: getProjects,
  });
