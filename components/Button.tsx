import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`cursor-pointer rounded-2xl inline-flex gap-1 justify-center items-center bg-[#141414] p-3 px-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
