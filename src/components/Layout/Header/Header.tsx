import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { User } from "../../../models/user.model";
import { BsGear, BsBoxArrowRight } from "react-icons/bs";

interface HeaderProps {
  onClick: () => void;
  user: User;
}

export const Header: FC<HeaderProps> = ({ onClick, user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <header className="flex w-full justify-between bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2 text-white items-center">
      <div className="flex items-center gap-4">
        <div>Todo App</div>
        <span className="text-sm opacity-80">@{user.username}</span>
      </div>
      <div className="flex gap-4">
        <button
          className="cursor-pointer rounded-md px-3 py-1 hover:bg-cyan-600 transition"
          onClick={onClick}
        >
          New Task
        </button>
        <button
          className="cursor-pointer rounded-md p-2 hover:bg-cyan-600 transition flex items-center gap-2"
          onClick={handleSettings}
          title="Settings"
        >
          <BsGear size={18} />
        </button>
        <button
          className="cursor-pointer rounded-md p-2 hover:bg-red-500 transition flex items-center gap-2"
          onClick={handleLogout}
          title="Logout"
        >
          <BsBoxArrowRight size={18} />
        </button>
      </div>
    </header>
  );
};
