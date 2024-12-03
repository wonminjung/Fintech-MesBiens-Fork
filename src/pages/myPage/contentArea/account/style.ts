import "../../../../global/style.css";
import styled from "styled-components";

const S = {
  /** AccountContainer.tsx */
  SelectedMenuHeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  // 선택 메뉴 제목
  MenuTitle: styled.div`
    font-size: 32px;
    font-weight: bold;
  `,
  // 검색 및 정렬
  SearchAndSortWrapper: styled.div`
    display: flex;
    justify-content: center;
    width: 40%;
    /* height: 70%; */
  `,
  AccountSearch: styled.div`
    display: flex;
    width: 60%;
    align-items: center;
    flex: 0.7;
  `,
  AccountSort: styled.div`
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    margin-left: 12px;
    font-size: 14px;
    border-radius: 20px;
    flex: 0.3;
    cursor: pointer;
    user-select: none;
    &:hover {
      filter: brightness(0.85);
    }
  `,
  AccountSortDropdown: styled.div`
    display: none;
    position: absolute;
    right: 0%;
    background-color: white;
    border: 1px solid lightgray;
    z-index: 100;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);

    &[data-activedropdown="true"] {
      display: block;
    }
  `,
  AccountSortDropdownItem: styled.div`
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  `,
  /** AccountListContainer.tsx */
  AccountListContainer: styled.div`
    height: 2000px;
  `,
  AccountCardListWrapper: styled.div`
    margin-top: 32px;
    width: 100%;
    height: 240px;
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
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background-color: var(--button-color);
    color: white;
    font-size: 60px;
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

  /** AccountCardListComponent.tsx */
  FilledAccountWrapper: styled.div`
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  // 카드리스트 상단
  FilledAccountHeader: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  BankInfoContainer: styled.div`
    width: 320px;
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--third-color);
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 10px;
  `,
  BankInfoWrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
  `,
  BankLogo: styled.div`
    width: 42px;
    height: 42px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  `,
  BaniInfo: styled.div`
    margin-left: 12px;
    user-select: none;
    & h4 {
      margin: 0;
      font-size: 15px;
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
  CardlistMenuBtn: styled.button`
    width: 48px;
    height: 48px;
    background-color: lightyellow;

    &:active {
      background-color: yellow;
    }
  `,
  // 카드리스트 하단
  FilledFooter: styled.div`
    display: flex;
    width: 100%;
    height: 72px;
    justify-content: flex-end;
  `,
  // 잔액 숨기기 버튼
  BalanceHideBtn: styled.div`
    input[type="checkbox"] {
      display: none;
    }

    label {
      display: block;
      position: relative;
      height: 40px;
      width: 70px;
      background-color: white;
      border: 2px solid #eee;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      margin: 10px;

      /* on/off에 따라 움직일 버튼 */
      &:after {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 0 1px #ddd;
        transition: all 0.3s ease-in-out;
        position: absolute;
        right: 43%;
        border-radius: 20px;
      }
    }

    input[type="checkbox"]:checked + label {
      background-color: #00e169;
      &:after {
        right: 0;
      }
    }
  `,
  Balance: styled.div`
    display: flex;
    width: 40%;
    background-color: white;
    border-radius: 20px;
    align-items: center;
    font-size: 22px;

    & > span {
      padding-left: 18px;

      &.balance-hidden {
        display: none;
      }
    }
  `,
  RemittanceBtn: styled.button`
    width: 15%;
    border-radius: 20px;
    margin-left: 8px;
    border: none;
    font-size: 16px;
    &:active {
      background-color: green;
    }
  `,
  CopyMessage: styled.div`
    position: absolute;
    /* top: 10px;
        right: 10px; */
    /* bottom: 10%; */
    justify-content: center;
    background-color: #4caf50;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    /* animation: fadeOut 2s forwards; */
    /* 
        @keyframes fadeOut {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 0;
            }
        } */
  `,
};

export default S;
