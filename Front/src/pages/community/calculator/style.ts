import styled from "styled-components";
import { H2 } from "../../../components/htags/style";
import PlainButton from "../../../components/button/PlainButton";
import DefaultButton from "../../../components/button/DefaultButton";

const C = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    z-index: 0;
    width: 100%;
  `,
  CalculatorContainer: styled.div`
    display: flex;
    overflow-y: auto;
    width: 750px;
    flex-direction: column;
    align-self: center;
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
  TitleContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: auto;
    padding: 0 var(--default-padding);
  `,
  ToggleContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  ToggleBtn: styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
  `,
  ExplanationContainerWrap: styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    border-bottom: 1px solid #ddd;
    justify-content: center;
  `,
  ExplanationContainer: styled.div`
    width: 100%;
    align-self: center;
    margin: 10px;
    border-radius: 8px;
    background-color: inherit;
    display: flex;
    justify-content: center;
    background-color: #ddd;
  `,
  TabContainer: styled.div`
    display: flex;
    width: auto;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
  `,
  PlainButton: styled(PlainButton)`
    border-radius: 0;
    &:hover {
      border-bottom: 1px solid black;
    }
    &.active {
      border-bottom: 1px solid black;
      font-weight: bold;
    }
  `,
  H2: styled(H2)`
    font-size: 15px;
    padding: 10px;
    margin: 0;
  `,
  P: styled.p`
    padding: 10px;
    margin: 0;
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    justify-content: space-between;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  `,
  Label: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 20px 0;
  `,
  InputContainer: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  `,
  Input: styled.input`
    border: none;
    border-bottom: 1px solid #ddd;
    text-align: end;
    flex: 1;
    &:focus {
      outline: none;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    margin-top: 20px;
  `,
  WhiteBtn: styled(PlainButton)`
    width: 50%;
    border: 1px solid #ddd;
    height: 3em;
    justify-content: center;
    align-items: center;
    gap: 5px;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #ddd;
    }
  `,
  FirstBtnContainer: styled.div`
    display: flex;
    margin: 0;
    width: 80px;
    margin-right: 10px;
  `,
  SecondBtnContainer: styled.div`
    display: flex;
    margin: 0;
    width: 150px;
    margin-right: 10px;
  `,
  ThirdBtnContainer: styled.div`
    display: flex;
    flex: 1;
  `,
  LeftTabBtn: styled.a`
    display: flex;
    width: 50%;
    height: 2em;
    border: 1px solid #ddd;
    border-radius: 8px 0 0 8px;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-in-out;
    padding: 3px;
    /* margin-left: 20px; */
    cursor: pointer;
    &.active {
      background-color: var(--forth-color);
      border-color: var(--third-color);
      color: var(--first-color);
    }
  `,
  RightTabBtn: styled.a`
    display: flex;
    width: 50%;
    height: 2em;
    border: 1px solid #ddd;
    border-radius: 0 8px 8px 0;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-in-out;
    padding: 3px;
    cursor: pointer;
    &.active {
      background-color: var(--forth-color);
      border-color: var(--third-color);
      color: var(--first-color);
    }
  `,
  CenterTabBtn: styled.a`
    display: flex;
    width: 50%;
    height: 2em;
    border: 1px solid #ddd;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-in-out;
    padding: 3px;
    cursor: pointer;
    &.active {
      background-color: var(--forth-color);
      border-color: var(--third-color);
      color: var(--first-color);
    }
  `,
  ColorBtn: styled(DefaultButton)`
    width: 50%;
    height: 3em;
  `,
};

export default C;
