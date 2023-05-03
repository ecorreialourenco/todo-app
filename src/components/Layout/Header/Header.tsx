import React, { FC } from "react";

interface HeaderProps {
  onClick: () => void;
}

export const Header: FC<HeaderProps> = ({ onClick }) => (
  <header className="flex w-full justify-between bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-white">
    <div>Todo App</div>
    <div className="cursor-pointer" onClick={onClick}>
      New Task
    </div>
  </header>
);
