import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";

export const BC = {
  BoardContent: styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
    padding: var(--default-padding);
    border-radius: var(--container-border-radius);
    box-sizing: border-box;
    /* 생성하는 박스는 margin을 포함하여 전체 사이즈를 지정 */
  `,
  HeaderContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Button: styled(DefaultButton)`
    width: 55px;
    height: 30px;
    font-size: 15px;
  `,
  BoardTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    flex-grow: 0;
    text-align: center;
    & th,
    td {
      padding: var(--default-padding);
      border-bottom: 1px solid var(--forth-color);
    }
  `,
  tr: styled.tr`
    background: var(--third-color);
    border-radius: 20px;
  `,
  trcont: styled.tr`
    &:hover {
      background: var(--forth-color);
    }
  `,
  th: styled.th`
    width: 2em;
  `,
  td: styled.td`
    width: 2em;
  `,
  tdtitle: styled.td`
    width: 2em;
    /* text-align: center; */
    white-space: nowrap; // 텍스트가 한 줄에만 표시되도록
    overflow: hidden; // 박스를 넘는 부분 숨기기
    text-overflow: ellipsis; // 넘치는 부분을 ...으로 표시
    max-width: 100px;
    &:hover {
      cursor: pointer;
    }
  `,
};
