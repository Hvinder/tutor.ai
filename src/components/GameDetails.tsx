import React from "react";
import { Label } from "./ui/label";
import { GameSession } from "@/types/Message";

const GameDetails: React.FC<{ gameSession: GameSession; word: string }> = ({
  gameSession,
  word,
}) => {
  return (
    <div className="md:w-3/5 w-[90%] flex items-center justify-center border border-solid border-slate-950 rounded-xl py-5 px-3 fixed bg-white z-10">
      {gameSession.studentUnderstood ? (
        <div className="flex flex-col items-center justify-between w-3/5 gap-4">
          <Label className="font-bold">{`MCQ MODE - ${word}`}</Label>
          <div className="w-full flex items-center justify-between">
            <Label className="font-bold">
              {`Score - ${gameSession.studentScore}`}
            </Label>
            <Label className="font-bold">
              {`Attempts - ${gameSession.questionsAttempt - 1} of 3`}
            </Label>
          </div>
        </div>
      ) : (
        <Label className="font-bold">{`LEARNING MODE - ${word}`}</Label>
      )}
    </div>
  );
};

export default GameDetails;
