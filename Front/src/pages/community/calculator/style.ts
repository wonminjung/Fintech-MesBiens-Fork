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
    width: 60%;
    flex-direction: column;
    align-self: center;
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
  ExplanationContainer: styled.div`
    width: auto;
    padding: 5px 10px;
    background-color: inherit;
    display: flex;
    justify-content: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  `,
  TabContainer: styled.div`
    display: flex;
    width: auto;
    padding: 0 20px;
  `,
  H2: styled(H2)`
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ddd;
    padding: 10px;
    margin: 0;
  `,
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    justify-content: space-between;
  `,
  Label: styled.div`
    display: flex;
    gap: 20px;
    padding: 20px;
  `,
  Input: styled.input`
    border: none;
    border-bottom: 1px solid #ddd;
    width: 80%;
    text-align: end;
    &:focus {
      outline: none;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
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
  ColorBtn: styled(DefaultButton)`
    width: 50%;
    height: 3em;
  `,
};

export default C;
