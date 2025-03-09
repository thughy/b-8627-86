
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-gray-300 ${className}`}>
      AutB
    </h1>
  );
};

export default Logo;
