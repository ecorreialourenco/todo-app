import { FC } from "react";

interface ModalTitleProps {
  title: string;
}

export const ModalTitle: FC<ModalTitleProps> = ({ title }) => (
  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-white">
    <h2>{title}</h2>
  </div>
);
