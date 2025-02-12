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
      <p>입금 은행 : {transactionProps?.receiverAccountNumber}</p>
      <p>출금 은행 : {transactionProps?.senderAccountNumber}</p>
      <p>송금 금액 : {transactionProps?.trnsBalance}</p>
      <Inputter />
    </Memo.MainContainer>
  );
};

export default AccountPwdModal;
