import styled from "styled-components";

interface DividerProps {
  margin?: string;
  height?: string;
  width?: string;
}

const VerticalDivider = styled.div<DividerProps>`
  height: ${(props) => props.height || ""};
  width: ${(props) => props.width || "1px"};
  background-color: #ccc;
  margin: ${(props) => props.margin || "0"};
`;

export default VerticalDivider;
