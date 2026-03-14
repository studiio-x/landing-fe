import { useMutation, useQuery } from "@tanstack/react-query";

import { postCutoutImage, postImage, getImage } from "@/apis/imageApi";

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

export const usePostImage = () =>
  useMutation({
    mutationFn: postImage,
  });
