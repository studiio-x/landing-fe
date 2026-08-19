export type ChatRole = "user" | "assistant";

export type ChatStatus = "sent" | "typing" | "done";

export interface ChatAttachment {
  id: string;
  imageUrl: string;
}

export interface ChatItem {
  id: string;
  role: ChatRole;
  text: string;
  status?: ChatStatus;
  attachments?: ChatAttachment[];
  imageKeys?: string[];        // AI 응답 이미지 (S3 key or URL)
  conceptSelectable?: boolean; // CONCEPT 모드: 이미지 선택 UI 표시 여부
}

export interface ChatSendPayload {
  text?: string;
  attachments?: ChatAttachment[];
}