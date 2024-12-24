import React from "react";
import { InputField, InputFieldBorder } from "./style";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  [key: string]: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DefaultInputField: React.FC<InputProps> = ({
  children,
  onChange,
  ...rest
}) => {
  return (
    <InputField onChange={onChange} {...rest}>
      {children}
    </InputField>
  );
};

export default DefaultInputField;
