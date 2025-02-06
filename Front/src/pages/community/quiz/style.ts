import { Link } from "react-router-dom";
import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";

export const M = {
  MainContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 77%;
    padding: 20px;
  `,
  Link: styled(Link)`
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: center;
    height: 100%;
  `,
  Button: styled(DefaultButton)`
    width: 15em;
  `,
  Tiles: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    width: 22em;
    height: 92%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #ffffff;
    /* 스크롤바 */
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: darkgray;
    }

    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }
  `,
  Img: styled.img`
    width: 100%;
    margin-bottom: 50px;
    border-radius: 8px;
  `,
};

export const ST = {
  StockTestContainer: styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    align-items: center;
    padding: 20px;
  `,
  StockTestForm: styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Label: styled.label`
    font-size: 20px;
    font-weight: bold;
  `,
  Table: styled.table`
    width: 100%;
    text-align: center;
    th,
    td {
      padding: 10px;
      vertical-align: middle;
    }
  `,
  RadioButton: styled.input.attrs({ type: "radio" })`
    width: 1em;
    margin: 25px 10px;
    align-items: center;
  `,
};
