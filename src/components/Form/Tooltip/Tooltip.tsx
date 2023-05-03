import React, { FC } from "react";
import "./Tooltip.css";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({ title, children }) => (
  <div className="tooltip">
    <div className="tooltip-title">{title}</div>
    {children}
  </div>
);
