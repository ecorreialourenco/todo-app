import { FC } from "react";

interface ButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`rounded-lg px-4 py-1 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
