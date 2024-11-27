import React from "react";
import InputField from "./style";

interface InputProps {
    children?: React.ReactNode;
    [key: string]: any;
}

const DefaultInputField: React.FC<InputProps> = ({children, ...rest}) => {
    return (
        <InputField {...rest}>
            {children}
        </InputField>
    )
}

export default DefaultInputField;