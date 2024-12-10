import "../../global/style.css";
import styled from "styled-components";

export const InputField = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 55px;
  padding: 5px;
  margin-bottom: 1em;
  /* border: 1px solid var(--border-color); */
  border: none;
  /* border-radius: var(--input-border-radius); */
  box-sizing: border-box;
`;

export const InputFieldBorder = styled.input`
  border-bottom: 2px solid #ccc;
`;
