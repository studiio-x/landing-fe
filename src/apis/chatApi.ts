import { axiosInstance } from "@/apis/axios";
import {
  PostChatMessageRequest,
  PostChatMessageResponse,
  PostConceptSelectRequest,
  PostConceptSelectResponse,
  GetChatHistoryResponse,
  GetReferencePresignResponse,
  GetMaskPresignResponse,
  ChatMode,
} from "@/types/api/chat.type";

export const postChatMessage = async (
  projectId: number,
  mode: ChatMode,
  body: PostChatMessageRequest,
): Promise<PostChatMessageResponse> => {
  const response = await axiosInstance.post<PostChatMessageResponse>(
    `/chat/${projectId}/message/${mode}`,
    body,
  );
  return response.data;
};

export const postConceptSelect = async (
  projectId: number,
  body: PostConceptSelectRequest,
): Promise<PostConceptSelectResponse> => {
  const response = await axiosInstance.post<PostConceptSelectResponse>(
    `/chat/${projectId}/concept/select`,
    body,
  );
  return response.data;
};

export const getChatHistory = async (
  projectId: number,
  page: number = 0,
): Promise<GetChatHistoryResponse> => {
  const response = await axiosInstance.get<GetChatHistoryResponse>(
    `/chat/${projectId}`,
    { params: { page } },
  );
  return response.data;
};

export const getReferencePresign = async (
  projectId: number,
): Promise<GetReferencePresignResponse> => {
  const response = await axiosInstance.get<GetReferencePresignResponse>(
    `/chat/${projectId}/reference/presign`,
  );
  return response.data;
};

export const getMaskPresign = async (
  projectId: number,
): Promise<GetMaskPresignResponse> => {
  const response = await axiosInstance.get<GetMaskPresignResponse>(
    `/chat/${projectId}/mask/presign`,
  );
  return response.data;
};
