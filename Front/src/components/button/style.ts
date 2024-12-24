import "../../global/style.css";
import styled from "styled-components";

export const DButton = styled.button<{ width?: string; height?: string }>`
  display: flex;
  background-color: var(--button-color);
  color: var(--text-color-white);
  border: none;
  padding: 5px;
  border-radius: var(--button-border-radius);
  cursor: pointer;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "5em"};
  height: ${(props) => props.height || "2.5em"};
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: var(--button-hover-color);
    /* text-decoration: underline; */
  }
`;

export const PButton = styled.button<{ width?: string; height?: string }>`
  display: flex;
  background-color: var(--container-color);
  color: var(--text-color-black);
  border: none;
  padding: 5px;
  border-radius: var(--button-border-radius);
  cursor: pointer;
  font-size: 15px;
  justify-content: center;
  width: ${(props) => props.width || "6em"};
  height: ${(props) => props.height || "2em"};
  transition: var(--text-color-white) 0.5s ease-in-out;
  &:hover {
    /* background-color: var(--button-hover-color); */
    /* text-decoration: underline; */
  }
`;
