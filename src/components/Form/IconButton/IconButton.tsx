import { FC } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  className?: string;
  onClick: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
  icon: Icon,
  className,
  onClick,
}) => {
  const IconComponent = Icon as React.ComponentType;

  return(
  <button className={`rounded-full p-2 ${className}`} onClick={onClick}>
    <IconComponent />
  </button>
)};
