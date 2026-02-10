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
}

export interface ChatSendPayload {
  text?: string;
  attachments?: ChatAttachment[];
}