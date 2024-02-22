import React from "react";
import axiosInstance from "@/lib/axios";

const useGetWord = () => {
  const [word, setWord] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController>(
    new AbortController()
  );

  const fetchWord = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.get("/word-game", {
        signal: abortControllerRef.current.signal,
      });
      const { word, questions = [] } = response.data?.data || {};
      if (!word || !questions.length) {
        throw new Error("Something went wrong");
      }
      setWord(word);
      setQuestions(questions);
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWord();
  }, []);

  return { word, questions, isLoading, isError };
};

export default useGetWord;
