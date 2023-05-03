import { FC } from "react";
import { Backdrop } from "./Backdrop";
import { ModalTitle } from "./ModalTitle";
import { ModalActions } from "./ModalActions";

interface ModalProps {
  title: string;
  closable?: boolean;
  closeTitle?: string;
  submitTitle?: string;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({
  title,
  closeTitle,
  submitTitle,
  onClose,
  onSubmit,
  children,
  disabled,
}) => (
  <>
    <Backdrop />
    <div className="z-10 absolute bottom-0 left-0 right-0 top-0 grid place-content-center">
      <div className="z-20 relative border-solid border-blue-400 bg-white">
        <ModalTitle title={title} />
        <div className="px-4 py-2">{children}</div>
        <ModalActions
          closeTitle={closeTitle}
          submitTitle={submitTitle}
          onClose={onClose}
          onSubmit={onSubmit}
          disabled={disabled}
        />
      </div>
    </div>
  </>
);
