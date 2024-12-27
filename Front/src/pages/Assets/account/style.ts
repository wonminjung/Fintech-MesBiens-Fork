import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../global/style.css";
import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";

const S = {
  AccountContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  /** AccountContainer.tsx */
  MenuHeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  // 선택 메뉴 제목
  h2: styled.h2`
    margin-left: 40px;
  `,
  // 검색 및 정렬
  SearchAndSortWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 200px;
  `,
  AccountSearch: styled.div`
    display: flex;
    width: 60%;
    align-items: center;
  `,
  DropdownContainer: styled.div`
    position: relative;
    width: 7vw;
  `,
  AccountSort: styled.div`
    display: flex;
    height: 42px;
    width: 80px;
    align-items: center;
    justify-content: space-evenly;
    background-color: lightgray;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    margin-left: 20px;
    z-index: 1000;

    &:hover {
      filter: brightness(0.85);
    }
  `,
  AccountSortIcon: styled(FontAwesomeIcon)`
    transform-origin: center center;

    &[data-spinsorticon="true"] {
      transform: rotate(180deg);
      transition: transform 0.3s;
    }

    &[data-spinsorticon="false"] {
      transform: rotate(360deg);
      transition: transform 0.3s;
    }
  `,
  Dropdown: styled.ul`
    display: none;
    position: absolute;
    list-style: none;
    padding: 0;
    margin: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--lightGrey);
    border-radius: 4px;
    background-color: white;
    right: 0;
    width: 10vw;
    margin-top: 8px;

    &[data-activedropdown="true"] {
      display: block;
    }
  `,
  DropdownItem: styled.li`
    padding: 12px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  `,
  /** AccountListContainer.tsx */
  AccountListContainer: styled.div`
    height: 500px;
  `,
  AccountCardListWrapper: styled.div`
    margin-top: 15px;
    width: 100%;
    margin-right: 1%;
    height: 100px;
    background-color: var(--forth-color);
    border-radius: var(--container-border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  // 계좌 없을 때
  EmptyAccountWrapper: styled.button`
    all: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  // 계좌 추가 버튼
  AddAccountBtn: styled.button`
    all: unset;
    display: flex;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: var(--button-color);
    color: white;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: 0.5s;

    &:active {
      transform: scale(1.15);
    }
    &:hover {
      background-color: var(--button-hover-color);
    }
  `,
  EmptyAccountDescription: styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: center;
    opacity: 0.7;
  `,
  EmptyAccountTip: styled.div`
    margin-top: 18px;
    display: flex;
    justify-content: center;
    opacity: 0.7;
  `,

  /* AccountCardListComponent.tsx */
  FilledAccountWrapper: styled.div`
    width: 100%;
    height: 80px;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
  `,
  // 카드리스트 상단
  FilledAccountHeader: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  BankInfoContainer: styled.div`
    width: 40%;
    /* height: 0px; */
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
    /* background: var(--third-color); */
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  `,
  BankInfoWrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
  `,
  BankLogo: styled.img`
    width: 50px;
    height: 50px;
    /* object-fit: cover; */
    border-radius: 50%;
    background: var(--white);
  `,
  BankInfo: styled.div`
    display: inline-block;
    width: 150px;
    margin: 20px 0;
    user-select: none;
    & h4 {
      margin: 0;
      font-size: 15px;
      /* color: white; */
      filter: brightness(0.93);
    }
  `,
  AccountNumberCopyBtn: styled.button`
    all: unset;
    width: 22px;
    height: 22px;

    &:active {
      transform: scale(1.05);
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      opacity: 0.4;
      cursor: pointer;
    }
  `,
  CardListMenuContainer: styled.div`
    /* position: relative; */
  `,
  CardlistMenuBtn: styled.button`
    width: 30x;
    height: 30px;
    border: none;
    border-radius: 50%;
    margin-left: 10px;
    background-color: inherit;
    font-size: 20px;
    color: grey;
    cursor: pointer;
    &:active {
      background-color: var(--lightGrey);
      color: white;
    }
  `,
  CardlistDropdown: styled.ul`
    position: absolute;
    padding: 0;
    margin: 0;
    width: 200px;
    right: 30px;
    top: 40%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: white;
    border: 1px solid var(--lightGrey);
    border-radius: 4px;
    list-style: none;
  `,
  CardlistDropDownItems: styled.li`
    padding: 12px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  `,
  // 카드리스트 하단
  FilledFooter: styled.div`
    display: flex;
    width: 80%;
    height: 56px;
    justify-content: flex-end;
  `,
  BalanceAmount: styled.div`
    width: 80%;
  `,
  // 잔액 숨기기 버튼
  BalanceHideBtn: styled.div`
    display: flex;
    align-items: end;
    input[type="checkbox"] {
      display: none;
    }

    label {
      display: block;
      position: relative;
      height: 36px;
      width: 72px;
      background-color: white;
      border: 2px solid #eee;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      margin: 0 10px;

      /* on/off에 따라 움직일 버튼 */
      &:after {
        content: "";
        display: block;
        width: 36px;
        height: 34px;
        background-color: white;
        border: 1px solid #ddd;
        transition: all 0.3s ease-in-out;
        position: absolute;
        right: 50%;
        border-radius: 20px;
      }
    }

    input[type="checkbox"]:checked + label {
      background-color: #00e169;
      &:after {
        right: 0;
        transform: translateX(7%);
      }
    }
  `,
  Balance: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 13em;
    background-color: white;
    border-radius: 20px;
    align-items: center;
    font-size: 18px;

    & > span {
      padding-left: 18px;

      &.balance-hidden {
        display: none;
      }
    }
  `,
  RemittanceBtn: styled(DefaultButton)`
    width: 15%;
    height: 100%;
    border-radius: 20px;
    margin-left: 8px;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:active {
      background-color: green;
    }
  `,
  CopyMessage: styled.div`
    position: absolute;
    display: inline-block;
    width: 50%;
    left: 100%;
    top: 10%;
    text-align: center;
    background-color: #4caf50;
    color: white;
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  `,
};

export default S;
