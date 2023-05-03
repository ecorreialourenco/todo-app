import { FC } from "react";
import { InputProps } from "../../../models/input.model";

export const Input: FC<InputProps> = ({ label, name, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onChange({ name, value });
  };

  return (
    <>
      {label && (
        <label htmlFor={name} className="pr-2">
          {label}:
        </label>
      )}
      <input
        type="text"
        id={name}
        data-testid="input"
        name={name}
        className="border-2 rounded-md border-solid border-gray-200"
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
