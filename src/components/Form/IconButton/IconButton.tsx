import { FC, ReactElement } from "react";

interface IconButtonProps {
  icon: ReactElement;
  className?: string;
  onClick: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
  icon,
  className,
  onClick,
}) => (
  <button className={`rounded-full p-2 ${className}`} onClick={onClick}>
    {icon}
  </button>
);
