import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import NavBar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col absolute top-0 w-full items-center"
      style={{ background: "hsl(var(--background))" }}
    >
      <NavBar />
      <div className="flex flex-col items-center justify-center gap-5 mt-10 w-[500px]">
        <div className="w-[400px] h-[250px] rounded-md bg-slate-300" />
        <Label className="text-lg text-center">
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
