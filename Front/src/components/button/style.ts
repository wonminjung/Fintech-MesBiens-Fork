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

export const TButton = {
  ToggleBtnContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `,
  /* On / Off toggle */
  ToggleBtn: styled.button`
    background-color: #b7b9ba;
    border: 1px solid #aaa;
    border-radius: 99px;
    width: 50px;
    height: 28px;
    transition: background-color 0.1s ease, border-color 0.2s ease;
    cursor: pointer;
    /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.748); */
    position: relative;
    &.toggled {
      background-color: var(--third-color);
      & div {
        left: calc(50px - 25px);
      }
    }
    &:hover {
      border-color: var(--third-color);
    }
  `,
  Thumb: styled.div`
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 99px;
    transform: translateX(0);
    transition: left 0.15s ease;
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
  `,
};
