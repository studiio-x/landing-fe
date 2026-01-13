export type ChatRole = "user" | "assistant";

export type ChatStatus = "sent" | "typing" | "done";

export interface ChatItem {
  id: string;
  role: ChatRole;
  text: string;
  status?: ChatStatus;
}
