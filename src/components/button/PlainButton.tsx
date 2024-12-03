import React from "react";
import { PButton } from "./style";

interface ButtonProps {
  children?: React.ReactNode;
  [key: string]: any;
}

const PlainButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <PButton type="submit" {...rest}>
      {children}
    </PButton>
  );
};

export default PlainButton;
