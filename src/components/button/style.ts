import "../../global/style.css"
import styled from "styled-components";

const Button = styled.button<{width?: string, height?: string}>`
    background-color: var(--button-color);
    color: var(--text-color-white);
    border: none;
    padding: 5px;
    border-radius: var(--button-border-radius);
    cursor: pointer;
    font-size: 1em;
    width: ${(props) => props.width || "5em"};
    height: ${(props) => props.height || "3em"};
    transition: background 0.5s;
    &:hover {
        background-color: var(--button-hover-color);
    }
`

export default Button;