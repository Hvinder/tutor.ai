import React from "react";
import axiosInstance from "@/lib/axios";
import MessageHistoryContext from "@/context/MessageHistory";

const useTalkWithTutor = (sessionId: string) => {
  const [messageFromTutor, setMessageFromTutor] = React.useState("");
  const [studentUnderstood, setStudentUnderstood] = React.useState(false);
  const { state: messageHistory, dispatch } = React.useContext(
    MessageHistoryContext
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const sendMessage = async (userInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.post(
        `/word-game/chat/${sessionId}`,
        { userInput }
      );
      const { messageFromTutor, studentUnderstood = false } =
        response.data?.data || {};
      setMessageFromTutor(messageFromTutor);
      dispatch?.({
        type: "",
        payload: { role: "user", content: userInput },
      });
      dispatch?.({
        type: "",
        payload: { role: "system", content: messageFromTutor },
      });
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
    messageFromTutor,
    studentUnderstood,
    isLoading,
    isError,
  };
};

export default useTalkWithTutor;
