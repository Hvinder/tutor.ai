import React from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { PersonIcon } from "@radix-ui/react-icons";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 bg-black flex items-center justify-between px-16">
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
        {/* <Avatar className="cursor-pointer border-2 border-solid border-white">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/72211410?v=4"
            alt="@shadcn"
          />
          <AvatarFallback>HV</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  );
};

export default NavBar;