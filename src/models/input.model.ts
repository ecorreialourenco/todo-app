export interface InputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: InputOnChangeProps) => void;
}

export interface InputOnChangeProps {
  name: string;
  value: string;
}
