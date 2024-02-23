import ChatBubble from "@/components/ChatBubble";
import GameDetails from "@/components/GameDetails";
import { LoadingSpinner } from "@/components/Loader";
import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useTalkWithTutor from "@/hooks/useTalkWithTutor";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const WordGame: React.FC = () => {
  const { sessionId = "1" } = useParams();
  const {
    sendMessage,
    gameSessionObj,
    initSession,
    isLoading: isMessageLoading,
  } = useTalkWithTutor(sessionId);
  const { toast } = useToast();

  const disableUserActivity =
    gameSessionObj.isComplete ||
    gameSessionObj.isLearnAgain ||
    isMessageLoading;

  const [userInput, setUserInput] = React.useState("");

  React.useEffect(() => {
    initSession(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const handleStartLearning = () => {
    sendMessage(`Word of the day is ${gameSessionObj.word}`);
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
      <div className="lg:w-4/5 w-full space-y-5 p-2 flex flex-col items-center mt-16 mb-40">
        {gameSessionObj.messageHistory.length ? (
          <GameDetails
            gameSession={gameSessionObj}
            word={gameSessionObj.word}
          />
        ) : (
          <></>
        )}
        {gameSessionObj.messageHistory.length ? (
          <>
            <div className="flex flex-col items-center justify-between gap-4 w-full">
              {gameSessionObj.messageHistory.map((msg, i) => (
                <ChatBubble key={msg._id || i} message={msg} />
              ))}
              {isMessageLoading ? (
                <ChatBubble
                  message={{ role: "system", content: "", _id: uuidv4() }}
                  isLoading
                />
              ) : null}
            </div>
            <div className="flex w-full flex-col gap-2 fixed z-10 bottom-0 py-5 px-4 bg-white">
              <Textarea
                placeholder="Type your message here."
                value={userInput}
                onChange={(ev) => setUserInput(ev.target.value)}
                disabled={disableUserActivity}
              />
              <Button
                onClick={handleSubmitUserInput}
                disabled={disableUserActivity}
              >
                Send message
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 mt-40">
            {isMessageLoading ? (
              <LoadingSpinner size={96} />
            ) : (
              <>
                <Label className="text-lg">
                  Word of the day is {gameSessionObj.word}
                </Label>
                <Button
                  onClick={handleStartLearning}
                  className="min-w-32 w-fit"
                >
                  Start session
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;
