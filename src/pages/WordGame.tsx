import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useGetWord from "@/hooks/useGetWord";
import useTalkWithTutor from "@/hooks/useTalkWithTutor";
import axiosInstance from "@/lib/axios";
import { Message } from "@/types/Message";
import React from "react";
import { useParams } from "react-router-dom";

const WordGame: React.FC = () => {
  const { sessionId = "1" } = useParams();
  const { word, isLoading: isWordLoading, isError: isWordError } = useGetWord();
  const {
    sendMessage,
    messageFromTutor,
    messageHistory,
    setMessageHistory,
    studentUnderstood,
    isLoading: isMessageLoading,
    isError: isMessageError,
  } = useTalkWithTutor(sessionId);

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
  }, [sessionId]);

  const handleStartLearning = () => {
    sendMessage(`Word of the day is ${word}`);
  };

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div>
        <Button onClick={handleStartLearning}>Start</Button>
      </div>
    </div>
  );
};

export default WordGame;
