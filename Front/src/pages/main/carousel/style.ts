import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";

export const C = {
  Carousel: styled.div`
    display: flex;
    overflow: hidden;
    width: 100%; /* 원하는 너비 */
    height: 100%; /* 원하는 높이 */
    position: relative;
    margin: auto; /* 중앙 정렬 */
    align-items: center;
  `,
  CarouselImg: styled.img`
    width: 100%;
    height: auto;
  `,
  Controls: styled.div`
    position: absolute;
    top: 10%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    align-items: center;
  `,
  Buttons: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: var(--forth-color);
    cursor: pointer;
    border-radius: 8px;
    width: 50px;
    height: 30px;
    &:hover {
      background-color: var(--forth-color);
    }
    &:active {
      background-color: var(--third-color);
    }
  `,
};
