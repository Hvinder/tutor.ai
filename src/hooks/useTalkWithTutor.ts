import React from "react";
import { v4 as uuidv4 } from "uuid";

import axiosInstance from "@/lib/axios";
import { GameSession } from "@/types/Message";

const initialGameSessionState = {
  id: "",
  messageHistory: [],
  questionsAttempt: 1,
  studentScore: 0,
  studentUnderstood: false,
  isComplete: false,
  isLearnAgain: false,
};

const useTalkWithTutor = (sessionId: string, word: string) => {
  const [gameSessionObj, setGameSessionObj] = React.useState<GameSession>(
    initialGameSessionState
  );

  const [currentQuestionId, setCurrentQuestionId] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const sendMessage = async (userInput: string) => {
    if (gameSessionObj.studentUnderstood) {
      await attemptAnswer(userInput);
    } else {
      await chatWithTutor(userInput);
    }
  };

  const chatWithTutor = async (userInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      // optimistic update
      const tempId = uuidv4();
      setGameSessionObj((g) => ({
        ...g,
        messageHistory: [
          ...(g?.messageHistory || []),
          { role: "user", content: userInput, _id: tempId },
        ],
      }));
      const response = await axiosInstance.post<{ data: GameSession }>(
        `/word-game/chat/${sessionId}`,
        { userInput, tempId }
      );
      const gameSession = response.data?.data;
      if (
        gameSession?.studentUnderstood &&
        !gameSessionObj?.studentUnderstood
      ) {
        startQuestions();
      }
      if (gameSession) {
        setGameSessionObj(gameSession);
      }
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const attemptAnswer = async (userInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      // optimistic update
      const tempId = uuidv4();
      setGameSessionObj((g) => ({
        ...g,
        messageHistory: [
          ...(g?.messageHistory || []),
          { role: "user", content: userInput, _id: tempId },
        ],
      }));
      const response = await axiosInstance.post<{ data: GameSession }>(
        `/word-game/answer/${sessionId}`,
        { userInput, word, questionId: currentQuestionId }
      );
      const gameSession = response.data?.data;
      if (gameSession) {
        setGameSessionObj(gameSession);
        if (!gameSession.isComplete && !gameSession.isLearnAgain) {
          startQuestions(gameSession.questionsAttempt);
        }
      }
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuestions = async (attempt?: number) => {
    if (gameSessionObj.questionsAttempt > 3) {
      return;
    }
    const response = await axiosInstance.get<{
      data: { gameSession: GameSession; questionId: string };
    }>(
      `/word-game/question/${sessionId}?word=${word}&attempt=${
        attempt || gameSessionObj.questionsAttempt
      }`
    );
    const { gameSession, questionId } = response.data?.data || {};
    if (gameSession) {
      setGameSessionObj(gameSession);
    }
    setCurrentQuestionId(questionId);
  };

  const initSession = async (sessionId: string) => {
    const response = await axiosInstance.get<{ data: GameSession }>(
      `/word-game/history/${sessionId}`
    );
    const gameSession = response.data.data;
    if (gameSession) {
      setGameSessionObj(response.data.data);
    }
  };

  return {
    sendMessage,
    gameSessionObj,
    isLoading,
    isError,
    initSession,
  };
};

export default useTalkWithTutor;
