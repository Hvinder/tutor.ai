import { Message } from "@/types/Message";
import { createContext } from "react";

const MessageHistoryContext = createContext<{
  state: Message[];
  dispatch:
    | React.Dispatch<{
        type: string;
        payload: Message;
      }>
    | undefined;
}>({ state: [], dispatch: undefined });

export default MessageHistoryContext;
