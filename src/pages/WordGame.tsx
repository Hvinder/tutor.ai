import NavBar from "@/components/Navbar";
import useGetWord from "@/hooks/useGetWord";
import useTalkWithTutor from "@/hooks/useTalkWithTutor";
import React from "react";
import { useParams } from "react-router-dom";

const WordGame: React.FC = () => {
  const { sessionId = "1" } = useParams();
  const { word, isLoading: isWordLoading, isError: isWordError } = useGetWord();
  const {
    sendMessage,
    messageFromTutor,
    studentUnderstood,
    isLoading: isMessageLoading,
    isError: isMessageError,
  } = useTalkWithTutor(sessionId);

  React.useEffect(() => {
    localStorage.setItem("sessionId", sessionId);
  }, [sessionId]);

  //   React.useEffect(() => {
  //     sendMessage(`Word of the day is ${word}`);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [word]);

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
    </div>
  );
};

export default WordGame;
