import React from "react";
import axiosInstance from "@/lib/axios";

const useGetWord = () => {
  const [word, setWord] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const fetchWord = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axiosInstance.get("/word-game");
      const word = response.data?.data;
      if (!word) {
        throw new Error("Something went wrong");
      }
      setWord(word);
    } catch (err: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWord();
  }, []);

  return { word, isLoading, isError };
};

export default useGetWord;
