import "../../../../global/style.css";
import styled from "styled-components";

const S = {
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
  EmptyAccountWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  // 계좌 추가 버튼
  AddAccountBtn: styled.div`
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
    & h4 {
      margin: 0;
      font-size: 15px;
    }
  `,
  AccountNumberCopyBtn: styled.div`
    width: 22px;
    height: 22px;

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
  // 잔액 숨기기 버튼 (작성 예정)
  BalanceHideBtn: styled.input``,
  Balance: styled.div`
    display: flex;
    width: 40%;
    background-color: white;
    border-radius: 20px;
    align-items: center;
    font-size: 22px;
    & span {
      padding-left: 18px;
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
};

export default S;
