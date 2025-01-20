import styled from "styled-components";

export const R = {
  TransferContainer: styled.div`
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    padding: 20px;
    /* border: 1px solid #ccc; */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow: auto;
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
  TransferHeader: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  TransferTable: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    flex-grow: 0;
    text-align: center;
  `,
  TableHeader: styled.tr`
    width: 2em;
    font-weight: bold;
    /* background-color: #e6e6e6; */
    background: var(--third-color);
    padding: 10px;
    /* border-radius: 5px; */
    text-align: center;
    /* color: #444;  */
  `,
  TableHeaderRow: styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    /* border-radius: 5px; */
    padding: var(--default-padding);
  `,
  TableRow: styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    padding: var(--default-padding);
  `,
  DateInputContainer: styled.div`
    padding: 10px;
    border-bottom: 1px solid #ddd;
  `,
  DateInput: styled.input`
    border: none;
    background-color: transparent;
  `,
  CategorySelectContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100px;
    padding: 0;
  `,
  CategorySelect: styled.select`
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.3s;
    font-weight: bold;
    font-size: 16px;
    /* &:hover {
      background-color: #e0e0e0;
    }
    &:active {
      background-color: #007bff;
      color: white;
    } */
  `,
};
