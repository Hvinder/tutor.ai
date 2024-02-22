export type MessageRole = "user" | "system";

export type Message = {
  role: MessageRole;
  content: string;
};
