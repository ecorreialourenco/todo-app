import { FC } from "react";
import { Button } from "../Form";

interface ModalActionsProps {
  closeTitle?: string;
  submitTitle?: string;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const ModalActions: FC<ModalActionsProps> = ({
  closeTitle,
  submitTitle,
  onClose,
  onSubmit,
  disabled,
}) => (
  <div className="flex justify-between px-4 py-2">
    <Button
      label={closeTitle || "Close"}
      className="bg-gray-400 text-white hover:bg-gray-600 mr-2"
      onClick={onClose}
    />
    <Button
      label={submitTitle || "Save"}
      className={`bg-blue-400 text-white ${
        !disabled ? "hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
      }  ml-2`}
      onClick={onSubmit}
      disabled={disabled}
    />
  </div>
);
