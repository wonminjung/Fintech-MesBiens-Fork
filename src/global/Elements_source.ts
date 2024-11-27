import "./style.css"
import styled from "styled-components";

const Elements_source = {
    DefaultButton: styled.button<{width?: string, height?: string}>`
        background-color: var(--button-color);
        color: var(--text-color-white);
        border: none;
        padding: 5px;
        border-radius: var(--button-border-radius);
        cursor: pointer;
        font-size: 1em;
        width: ${(props) => props.width || "5em"};
        height: ${(props) => props.height || "3em"};
        &:hover {
            background-color: var(--button-hover-color);
        }
    `,
    InputField: styled.input`
        width: 80%;
        height: 40px;
        padding: 5px;
        margin-bottom: 1em;
        border: 1px solid var(--border-color);
        border-radius: var(--button-border-radius);
    `,
}

export default Elements_source;