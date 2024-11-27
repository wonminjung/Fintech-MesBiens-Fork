import React from "react";
import Button from "./style"

interface ButtonProps {
    children?: React.ReactNode;
    [key: string]: any;
}

const DefaultButton: React.FC<ButtonProps> = ({children, ...rest}) => {
    return (
        <Button {...rest}>
            {children}
        </Button>
    );
};

export default DefaultButton;