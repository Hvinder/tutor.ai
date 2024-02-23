import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import DictionaryIcon from "@/assets/DictionaryIcon";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center overscroll-none"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="flex flex-col items-center justify-center gap-5 mt-24 max-w-[500px]">
        {/* <ReaderIcon className="size-24" /> */}
        <DictionaryIcon />
        <Label className="text-lg text-center md:w-full w-4/5 rounded-md text-slate-950 p-4">
          Hi there! I'm here to help you learn new words - everyday! Ready to
          get started?
        </Label>
        <Button onClick={() => navigate(`/word-game/${uuidv4()}`)}>
          START LEARNING
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
