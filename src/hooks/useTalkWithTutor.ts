import React from "react";
import axiosInstance from "@/lib/axios";
import { Message } from "@/types/Message";

const useTalkWithTutor = (sessionId: string, word: string) => {
  const [studentUnderstood, setStudentUnderstood] = React.useState(false);
  const [messageHistory, setMessageHistory] = React.useState<Message[]>([]);
  const [studentScore, setStudentScore] = React.useState(0);
  const [questionsAttempt, setQuestionsAttempt] = React.useState(1);
  const [currentQuestionId, setCurrentQuestionId] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLearnAgain, setIsLearnAgain] = React.useState(false);

  const sendMessage = async (userInput: string) => {
    if (studentUnderstood) {
      await attemptAnswer(userInput);
    } else {
      await chatWithTutor(userInput);
    }
  };
  const chatWithTutor = async (userInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMessageHistory((h) => [...h, { role: "user", content: userInput }]);
      const response = await axiosInstance.post(
        `/word-game/chat/${sessionId}`,
        { userInput }
      );
      const {
        messageFromTutor,
        studentUnderstood: currentStudentUnderstood = false,
      } = response.data?.data || {};
      setMessageHistory((h) => [
        ...h,
        { role: "system", content: messageFromTutor },
      ]);
      if (currentStudentUnderstood && !studentUnderstood) {
        setMessageHistory((h) => [
          ...h,
          { role: "system", content: "Now answer the following questions" },
        ]);
        startQuestions();
      }
      setStudentUnderstood(currentStudentUnderstood);
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
      setMessageHistory((h) => [...h, { role: "user", content: userInput }]);
      const response = await axiosInstance.post(
        `/word-game/answer/${sessionId}`,
        { userInput, word, questionId: currentQuestionId }
      );
      const { messageFromTutor, isCorrect = false } = response.data?.data || {};
      setMessageHistory((h) => [
        ...h,
        { role: "system", content: messageFromTutor },
      ]);
      if (isCorrect) {
        const newScore = studentScore + 1;
        if (newScore === 2) {
          setIsComplete(true);
          setMessageHistory((h) => [
            ...h,
            {
              role: "system",
              content: `Congratulations! You've successfully learnt the word ${word}. Try using it while conversing with your friends.`,
            },
          ]);
          return;
        }
        setStudentScore((s) => s + 1);
      }
      const newAttempt = questionsAttempt + 1;
      if (newAttempt > 3) {
        setMessageHistory((h) => [
          ...h,
          {
            role: "system",
            content: `You may need to revisit the word again. Let's try learning about ${word} from the top and circle back to the questions.`,
          },
        ]);
        setIsLearnAgain(true);
      }
      setQuestionsAttempt((a) => a + 1);
      startQuestions(newAttempt);
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuestions = async (attempt?: number) => {
    if (questionsAttempt > 3) {
      return;
    }
    const response = await axiosInstance.get(
      `/word-game/question/${sessionId}?word=${word}&attempt=${
        attempt || questionsAttempt
      }`
    );
    setMessageHistory((h) => [
      ...h,
      { role: "system", content: response.data?.data?.questionContent },
    ]);
    setCurrentQuestionId(response.data?.data?.questionId);
  };

  return {
    sendMessage,
    studentScore,
    questionsAttempt,
    messageHistory,
    setMessageHistory,
    isLoading,
    isError,
    isComplete,
    isLearnAgain,
  };
};

export default useTalkWithTutor;
