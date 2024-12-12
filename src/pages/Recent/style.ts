import styled from "styled-components";

export const R = {
  AutoTransferContainer: styled.div`
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  `,
  AutoTransferTable: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  TableHeader: styled.tr`
    width: 100%;
    font-weight: bold;
    background-color: #e6e6e6;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    color: #444;
  `,
  TableHeaderRow: styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    border-radius: 5px;
  `,
  TableRow: styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  `,
};
