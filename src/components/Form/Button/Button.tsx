import { FC } from "react";

interface ButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
  type?:"submit" | "reset" | "button"
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  className,
  disabled,
  type,
  onClick,
}) => {
  return (
    <button
      className={`rounded-lg px-4 py-1 ${className}`}
      onClick={()=>onClick?.()}
      type={type ?? "button"}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
