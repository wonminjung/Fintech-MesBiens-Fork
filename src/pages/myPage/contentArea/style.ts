import "../../../global/style.css";
import styled from "styled-components";

const S = {
  /** ContentAreaContainer.tsx */
  ContentAreaContainer: styled.div`
    width: 75%;
    margin: 14px 6px 14px 20px;
  `,
  SelectedMenuContentContainer: styled.div`
    padding-top: 18px;
    padding-right: 14px;
    height: calc(100% - 18px);
    overflow-y: scroll;

    /* 스크롤바 */
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: var(--scrollbaractive-color);
    }

    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }
  `,
  SelectedMenuHeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  // 선택 메뉴 제목
  MenuTitle: styled.div`
    font-size: var(--Subtitle);
    font-weight: bold;
  `,
  // 검색 및 정렬
  SearchAndSortWrapper: styled.div`
    display: flex;
    justify-content: right;
    width: 40%;
    height: 70%;
  `,
  AccountSearch: styled.div`
    display: flex;
    width: 60%;
    align-items: center;
  `,
  //   AccountSort: styled.div`
  //     display: flex;
  //     width: 40%;
  //     align-items: center;
  //     justify-content: center;
  //     background-color: var(--button-color);
  //     color: var(--text-color-white);
  //     border: none;
  //     padding: 5px;
  //     width: 100px;
  //     margin-left: 12px;
  //     font-size: 14px;
  //   `,

  /** AccountListContainer.tsx */
  AccountListContainer: styled.div`
    height: 2000px;
  `,
};

export default S;
