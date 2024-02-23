import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/Message";
import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";

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
        "md:w-4/5 w-[95%] flex gap-2",
        isTutor ? "flex-row" : "flex-row-reverse"
      )}
    >
      {!isTutor ? (
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/72211410?v=4"
            alt="@shadcn"
          />
          <AvatarFallback>student</AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex items-center justify-center border-2 border-slate-950 rounded-[50%] h-10 w-10">
          <PersonIcon className="h-6 w-6" />
        </div>
      )}
      {isLoading ? (
        <div className="max-w-[60%] rounded-md p-3 transition-[height] duration-200 ease-in bg-slate-200 text-slate-950 w-[60%]">
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-2 bg-slate-400 rounded w-full"></div>
            <div className="flex gap-2 animate-pulse">
              <div className="h-2 bg-slate-400 rounded w-7/12"></div>
              <div className="h-2 bg-slate-400 rounded w-5/12"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded w-3/12"></div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "max-w-[60%] rounded-md p-3 transition-[height] duration-200 ease-in",
            isTutor ? "bg-slate-200" : "bg-slate-950",
            isTutor ? "text-slate-950" : "text-slate-200",
            isLoading ? "w-[60%]" : "w-fit"
          )}
          dangerouslySetInnerHTML={{
            __html: message.content,
          }}
        />
      )}
    </div>
  );
};

export default ChatBubble;
