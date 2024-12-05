import React, { useState } from "react";
import { T } from "./style";
import VerticalDivider from "../../components/divider/VerticalDivider";
import HorizontalDivider from "../../components/divider/HorizontalDivider";

const Transaction: React.FC = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [계좌번호, set계좌번호] = useState("");

  const handleInputClick = () => {
    setShowBankDetails(true);
  };

  const handleBankSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = event.target.value;
    console.log(selectedBank);
    setSelectedBank(selectedBank);
  };

  const handle계좌번호 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 계좌번화 = event.target.value;
    console.log(계좌번호);
    set계좌번호(계좌번호);
  };

  return (
    <T.MainContainer>
      <T.FirstPage>
        <T.H1>어디로 돈을 보낼까요?</T.H1>
        <T.Input
          placeholder={"계좌번호 입력"}
          onClick={handleInputClick}
          onChange={handle계좌번호}
        />
        <HorizontalDivider width="90%" />
        {showBankDetails && <T.H1>어떤 계좌로 보낼까요?</T.H1>}
        {showBankDetails && (
          <T.Select id="BankSelect" onChange={handleBankSelect}>
            <option value="" disabled selected>
              은행 선택
            </option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="하나은행">하나은행</option>
            <option value="농협은행">농협은행</option>
          </T.Select>
        )}
        <HorizontalDivider width="90%" />
        {showBankDetails && (
          <T.Select id="MyAccounts" onChange={handleBankSelect}>
            <option value="" disabled selected>
              내 계좌
            </option>
            <option value="내 국민은행">국민은행</option>
            <option value="내 신한은행">신한은행</option>
            <option value="내 우리은행">우리은행</option>
            <option value="내 하나은행">하나은행</option>
            <option value="내 농협은행">농협은행</option>
          </T.Select>
        )}
        <HorizontalDivider width="90%" />
        {showBankDetails && (
          <T.Select id="RecentTransactions">
            <option value="" disabled selected>
              최근 보낸 계좌
            </option>
            <option value="mybank1">국민은행</option>
            <option value="mybank1">신한은행</option>
            <option value="mybank1">우리은행</option>
            <option value="mybank1">하나은행</option>
            <option value="mybank1">농협은행</option>
          </T.Select>
        )}
      </T.FirstPage>

      <VerticalDivider />

      <T.SecondPage>
        <T.MyBank>
          <p>내</p>
          <T.Select id="MyBank" style={{ width: "15em" }}>
            <option value="" disabled selected>
              내 계좌
            </option>
            <option value="mybank1">국민은행</option>
            <option value="mybank1">신한은행</option>
            <option value="mybank1">우리은행</option>
            <option value="mybank1">하나은행</option>
            <option value="mybank1">농협은행</option>
          </T.Select>
          <p>계좌에서</p>
          {/* <h5>잔액 000000 원</h5> */}
        </T.MyBank>
        <h1>{selectedBank} 계좌로</h1>
        <h5>계좌번호 {계좌번호}</h5>
        <T.Input placeholder={"얼마나 보낼까요?"} />
        <T.Balance></T.Balance>
      </T.SecondPage>
    </T.MainContainer>
  );
};

export default Transaction;
