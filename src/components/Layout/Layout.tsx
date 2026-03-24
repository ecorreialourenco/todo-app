import React, { FC } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { User } from "../../models/user.model";

interface LayoutProps {
  onClick: () => void;
  children: React.ReactNode;
  user: User;
}

export const Layout: FC<LayoutProps> = ({ onClick, children, user }) => {
  return (
    <>
      <Header onClick={onClick} user={user} />
      <div className="h-[calc(100vh-5rem)] p-4">{children}</div>
      <Footer />
    </>
  );
};
