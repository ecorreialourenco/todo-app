import React, { FC } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ onClick, children }) => {
  return (
    <>
      <Header onClick={onClick} />
      <div className="h-[calc(100vh-5rem)] p-4">{children}</div>
      <Footer />
    </>
  );
};
