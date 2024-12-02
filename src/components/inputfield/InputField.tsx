import React from "react";
import { InputField, InputFieldBorder } from "./style";

interface InputProps {
  children?: React.ReactNode;
  [key: string]: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력필드에 값이 들어왔을 때
}

const DefaultInputField: React.FC<InputProps> = ({
  children,
  onChange,
  ...rest
}) => {
  return <InputField {...rest}>{children}</InputField>;
};

export default DefaultInputField;
