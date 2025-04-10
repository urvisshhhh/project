import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-white ${
        className ? className : "bg-blue-500 hover:bg-blue-600"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
