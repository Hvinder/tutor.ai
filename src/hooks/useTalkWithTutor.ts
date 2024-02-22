import React from "react";
import axiosInstance from "@/lib/axios";
import { Message } from "@/types/Message";

const useTalkWithTutor = (sessionId: string) => {
  const [studentUnderstood, setStudentUnderstood] = React.useState(false);
  const [messageHistory, setMessageHistory] = React.useState<Message[]>([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const sendMessage = async (userInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessageHistory((h) => [...h, { role: "user", content: userInput }]);
      const response = await axiosInstance.post(
        `/word-game/chat/${sessionId}`,
        { userInput }
      );
      const { messageFromTutor, studentUnderstood = false } =
        response.data?.data || {};
      setMessageHistory((h) => [
        ...h,
        { role: "system", content: messageFromTutor },
      ]);
      setStudentUnderstood(studentUnderstood);
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    messageHistory,
    setMessageHistory,
    studentUnderstood,
    isLoading,
    isError,
  };
};

export default useTalkWithTutor;
