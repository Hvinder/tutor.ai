import React from "react";

import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-black flex items-center px-16 fixed z-10 gap-2">
      <CrumpledPaperIcon color="white" className="size-5" />
      <Label
        className="text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        TUTOR.AI
      </Label>
    </div>
  );
};

export default NavBar;
