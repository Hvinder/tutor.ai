import ChatBubble from "@/components/ChatBubble";
import { LoadingSpinner } from "@/components/Loader";
import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useGetWord from "@/hooks/useGetWord";
import useTalkWithTutor from "@/hooks/useTalkWithTutor";
import axiosInstance from "@/lib/axios";
import { Message } from "@/types/Message";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useParams } from "react-router-dom";

const WordGame: React.FC = () => {
  const { sessionId = "1" } = useParams();
  const { word, isLoading: isWordLoading } = useGetWord();
  const {
    sendMessage,
    messageHistory,
    setMessageHistory,
    isLoading: isMessageLoading,
  } = useTalkWithTutor(sessionId, word);
  const { toast } = useToast();

  const [userInput, setUserInput] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
    (async () => {
      const existingMessageHistory = await axiosInstance.get<{
        data: { sessionHistory: Message[] };
      }>(`/word-game/history/${sessionId}`);
      setMessageHistory(
        existingMessageHistory?.data?.data?.sessionHistory || []
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const handleStartLearning = () => {
    sendMessage(`Word of the day is ${word}`);
  };

  const handleSubmitUserInput = () => {
    if (!userInput) {
      toast({
        description: "Please enter your response",
        variant: "destructive",
      });
      return;
    }
    sendMessage(userInput);
    setUserInput("");
  };

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center gap-4"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="lg:w-4/5 w-full space-y-5 p-2">
        {messageHistory.length ? (
          <>
            <div className="flex flex-col items-center justify-center gap-4">
              {messageHistory.map((msg, i) => (
                <ChatBubble key={i} message={msg} />
              ))}
              {isMessageLoading ? (
                <ChatBubble
                  message={{ role: "system", content: "" }}
                  isLoading
                />
              ) : null}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Textarea
                placeholder="Type your message here."
                value={userInput}
                onChange={(ev) => setUserInput(ev.target.value)}
              />
              <Button onClick={handleSubmitUserInput}>Send message</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 mt-40">
            <Label className="text-lg">Word of the day is {word}</Label>
            <Button onClick={handleStartLearning} className="min-w-32 w-fit">
              {isWordLoading ? <LoadingSpinner /> : "Start session"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;
