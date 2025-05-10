import { Clapperboard } from "lucide-react";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 text-red-500">
      <Clapperboard />
      <p className="font-bold text-2xl">FlimNest</p>
    </div>
  );
};

export default Logo;
