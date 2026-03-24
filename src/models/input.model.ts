export interface InputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: InputOnChangeProps) => void;
  type?: string;
}

export interface InputOnChangeProps {
  name: string;
  value: string;
}
