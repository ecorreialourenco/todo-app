import { FC } from "react";
import { Input, Modal } from "../../../components";
import { InputOnChangeProps } from "../../../models/input.model";

interface AddTaskModalProps {
  value: string;
  setValue: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const AddTaskModal: FC<AddTaskModalProps> = ({
  value,
  setValue,
  onClose,
  onSubmit,
}) => {
  const handleChange = (val: InputOnChangeProps) => {
    const { value } = val;
    setValue(value);
  };

  return (
    <Modal
      title="Task"
      onClose={onClose}
      onSubmit={onSubmit}
      disabled={!value.length}
    >
      <Input label="Task" name="task" value={value} onChange={handleChange} />
    </Modal>
  );
};
