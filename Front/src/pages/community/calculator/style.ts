import styled from "styled-components";

const C = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  CalculatorContainer: styled.div`
    display: flex;
    width: 100%;
  `,
  TitleContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--default-padding);
  `,
  ToggleContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ToggleBtn: styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
  `,
  ExplanationContainer: styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  `,
};

export default C;
