import styled from "styled-components";

export const T = {
  Trading: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  `,
  TopRow: styled.div`
    display: flex;
    gap: 20px;
    height: 350px;
    margin-bottom: 40px;
  `,
  ChartContainer: styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    justify-content: center;
    align-items: center;
    text-align: center;
  `,
  StockList: styled.div`
    flex: 1;
    height: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  `,
  BottomRow: styled.div`
    display: flex;
    gap: 20px;
    height: 350px;
  `,
  BuySellContainer: styled.div`
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px; /* 영역 크기 조정 */
    padding: 10px;
    & label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    & input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    gap: 10px;
  `,
  OrderHistory: styled.div`
    flex: 2;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    & table {
      width: 100%;
      border-collapse: collapse;
    }
    & td,
    th {
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    & th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  `,
};
