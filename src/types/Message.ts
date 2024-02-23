type MessageRole = "user" | "system";

export type Message = {
  _id: string;
  role: MessageRole;
  content: string;
};

export type GameSession = {
  id: string;
  messageHistory: Message[];
  questionsAttempt: number;
  studentScore: number;
  studentUnderstood: boolean;
  isComplete: boolean;
  isLearnAgain: boolean;
};
