import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  postCutoutImage,
  postImage,
  getImage,
  postCustomBackgroundImage,
} from "@/apis/imageApi";

import { queryKeys } from "./queryKeys";

export const useGetImage = (imageId: number) =>
  useQuery({
    queryKey: queryKeys.image.detail(imageId),
    queryFn: () => getImage(imageId),
    enabled: !!imageId,
  });

export const usePostCutoutImage = () =>
  useMutation({
    mutationFn: postCutoutImage,
  });

export const usePostImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.project.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.folder.all });
    },
  });
};

export const usePostCustomBackgroundImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCustomBackgroundImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.project.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.folder.all });
    },
  });
};
