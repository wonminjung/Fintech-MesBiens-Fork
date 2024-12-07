import React, { useEffect, useRef, useState } from "react";
import { T } from "./style";
import VerticalDivider from "../../components/divider/VerticalDivider";
import HorizontalDivider from "../../components/divider/HorizontalDivider";
import DefaultButton from "../../components/button/DefaultButton";

const Transaction: React.FC = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [계좌번호, set계좌번호] = useState("");
  const [입력금액, set입력금액] = useState("");

  const accountNumberRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const 금액 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 입력금액 = event.target.value;
    set입력금액(입력금액);
  };
  const handle금액 = () => {
    console.log(`입력금액: ${입력금액}`);
  };
  const handleInputClick = () => {
    setShowBankDetails(true);
  };

  const handleBankSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = event.target.value;
    console.log(selectedBank);
    setSelectedBank(selectedBank);
  };
  const handleMyBankSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const myselectedBank = event.target.value;
    console.log(myselectedBank);
    if (amountRef.current) {
      amountRef.current.focus();
    }
  };

  const handle계좌번호 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 계좌번호 = event.target.value;
    console.log(계좌번호);
    set계좌번호(계좌번호);
  };

  useEffect(() => {
    if (accountNumberRef.current) {
      accountNumberRef.current.focus();
    }
  }, []);

  return (
    <T.MainContainer>
      <T.FirstPage>
        <T.H1>어디로 돈을 보낼까요?</T.H1>
        <T.Input
          placeholder={"계좌번호 입력"}
          onChange={handle계좌번호}
          ref={accountNumberRef}
        />
        <T.Button onClick={handleInputClick}>입력</T.Button>
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
          <T.Select id="RecentTransactions" onChange={handleBankSelect}>
            <option value="" disabled selected>
              최근 보낸 계좌
            </option>
            <option value="R국민은행">국민은행</option>
            <option value="R신한은행">신한은행</option>
            <option value="R우리은행">우리은행</option>
            <option value="R하나은행">하나은행</option>
            <option value="R농협은행">농협은행</option>
          </T.Select>
        )}
      </T.FirstPage>

      <VerticalDivider />
      {selectedBank && (
        <>
          <T.SecondPage>
            <T.MyBank>
              <p>내</p>
              <T.Select
                id="MyBank"
                style={{ width: "15em" }}
                onChange={handleMyBankSelect}
              >
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
            </T.MyBank>
            <T.H1>{selectedBank} 계좌로</T.H1>
            <T.H5>계좌번호 {계좌번호}</T.H5>
            <T.Input
              placeholder={"얼마나 보낼까요?"}
              ref={amountRef}
              onChange={금액}
            />
            <T.Button onClick={handle금액}>확인</T.Button>
          </T.SecondPage>
        </>
      )}
    </T.MainContainer>
  );
};

export default Transaction;
