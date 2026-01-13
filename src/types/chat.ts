export type ChatRole = "user" | "assistant";

export interface ChatItem {
  id: string;
  role: ChatRole;
  text: string;
}
