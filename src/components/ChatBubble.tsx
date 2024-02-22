import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/Message";
import { cn } from "@/lib/utils";

type ChatBubbleProps = {
  message: Message;
  isLoading?: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isLoading = false,
}) => {
  const isTutor = message.role === "system";

  return (
    <div
      className={cn(
        "w-4/5 flex gap-2",
        isTutor ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Avatar>
        <AvatarImage
          src={
            isTutor
              ? `https://avatars.githubusercontent.com/u/72211410?v=4`
              : `https://avatars.githubusercontent.com/u/72211410?v=4`
          }
          alt="@shadcn"
        />
        <AvatarFallback>{isTutor ? "tutor" : "student"}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[60%] rounded-md p-3 transition-[height] duration-200 ease-in",
          isTutor ? "bg-slate-200" : "bg-slate-950",
          isTutor ? "text-slate-950" : "text-slate-200",
          isLoading ? "w-[60%]" : "w-fit"
        )}
      >
        {isLoading ? "..." : message.content}
      </div>
    </div>
  );
};

export default ChatBubble;