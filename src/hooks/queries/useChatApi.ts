import { useMutation, useQuery } from "@tanstack/react-query";

import {
  postChatMessage,
  postConceptSelect,
  getChatHistory,
  getReferencePresign,
  getMaskPresign,
} from "@/apis/chatApi";
import { ChatMode, PostChatMessageRequest, PostConceptSelectRequest } from "@/types/api/chat.type";

import { queryKeys } from "./queryKeys";

export const useGetChatHistory = (projectId: number, page: number = 0) =>
  useQuery({
    queryKey: queryKeys.chat.history(projectId, page),
    queryFn: () => getChatHistory(projectId, page),
    enabled: !!projectId,
  });

export const useGetReferencePresign = (projectId: number) =>
  useQuery({
    queryKey: queryKeys.chat.referencePresign(projectId),
    queryFn: () => getReferencePresign(projectId),
    enabled: !!projectId,
  });

export const useGetMaskPresign = (projectId: number) =>
  useQuery({
    queryKey: queryKeys.chat.maskPresign(projectId),
    queryFn: () => getMaskPresign(projectId),
    enabled: !!projectId,
  });

export const usePostChatMessage = () =>
  useMutation({
    mutationFn: ({
      projectId,
      mode,
      body,
    }: {
      projectId: number;
      mode: ChatMode;
      body: PostChatMessageRequest;
    }) => postChatMessage(projectId, mode, body),
  });

export const usePostConceptSelect = () =>
  useMutation({
    mutationFn: ({
      projectId,
      body,
    }: {
      projectId: number;
      body: PostConceptSelectRequest;
    }) => postConceptSelect(projectId, body),
  });
