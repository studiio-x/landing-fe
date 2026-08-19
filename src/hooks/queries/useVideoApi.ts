import { useMutation } from "@tanstack/react-query";

import { postVideo } from "@/apis/videoApi";
import { PostVideoParams, PostVideoRequest } from "@/types/api/video.type";

export const usePostVideo = () =>
  useMutation({
    mutationFn: ({
      params,
      body,
    }: {
      params: PostVideoParams;
      body: PostVideoRequest;
    }) => postVideo(params, body),
  });
