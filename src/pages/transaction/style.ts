import styled, { css } from "styled-components";

export const T = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
  `,
  H1: styled.h1`
    font-size: 20px;
    text-align: left;
  `,
  Input: styled.input.attrs({ type: "number" })`
    width: 80%;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-bu6yhbton {
      -webkit-appearance: none; /* Chrome, Safari, Edge에서 화살표 제거 */
      margin: 0;
    }
    /* hover랑 focus 시에도 Chrome, Safari, Edge에서 화살표 제거 */
    /* &:hover,
    &:focus {
      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    } */
  `,
  Select: styled.select`
    width: 80%;
    padding: 10px;
    margin: 20px 0;
    /* border: 1ps solid #e0e0e0; */
    border: none;
    border-radius: 4px;
    /* transform: translateY(-20px); */
    transition: opacity 0.5s ease, trasform 0.5s ease;
  `,

  /* 첫번째 화면 */
  FirstPage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25em;
    height: 93%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #ffffff;
  `,
  /* 두번째 화면 */
  SecondPage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25em;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #ffffff;
  `,
  MyBank: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
  `,
  Balance: styled.button`
    width: 100%;
    text-align: center;
    margin: 20px 0;
  `,
};
