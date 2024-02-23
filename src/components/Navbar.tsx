import React from "react";

import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { PersonIcon } from "@radix-ui/react-icons";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-black flex items-center justify-between px-16 fixed z-10">
      <Label
        className="text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        TUTOR.AI
      </Label>
      <div className="flex items-center gap-10">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <PersonIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
