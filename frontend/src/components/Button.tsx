import React from "react";

interface ButtonProps {
  label: string;
  onClick: (number: number) => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={() => onClick(1000)}>{label}</button>;
};
