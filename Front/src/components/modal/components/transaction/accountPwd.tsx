import React from "react";
import { Memo } from "./style";
import { useSelector } from "react-redux";
import { RootState } from "../../../../modules/store/store";
import Inputter from "../../../inputter/Inputter";

const AccountPwdModal: React.FC = () => {
  const transactionProps = useSelector(
    (state: RootState) => state.modal.modalProps
  );

  return (
    <Memo.MainContainer>
      <h1>계좌 비밀번호 입력</h1>
      {/* <p>입금 계좌 : {transactionProps?.receiverAccountNumber}</p>
      <p>출금 계좌 : {transactionProps?.senderAccountNumber}</p>
      <p>
        송금 금액 : {Number(transactionProps?.trnsBalance).toLocaleString()}원
      </p> */}
      <Inputter />
    </Memo.MainContainer>
  );
};

export default AccountPwdModal;
