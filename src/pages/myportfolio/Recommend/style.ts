import styled from "styled-components";

export const R = {
  RecommendationContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `,
};

export const ST = {
  StockTestContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
