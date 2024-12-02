import styled from "styled-components";

interface DividerProps {
  margin?: string;
  height?: string;
  width?: string;
}

const HorizontalDivider = styled.div<DividerProps>`
  height: ${(props) => props.height || "1px"};
  width: ${(props) => props.width || ""};
  background-color: #ccc;
  margin: ${(props) => props.margin || ""};
`;

export default HorizontalDivider;
