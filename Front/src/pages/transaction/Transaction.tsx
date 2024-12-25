import React, { useEffect, useRef, useState } from "react";
import { T } from "./style";
import VerticalDivider from "../../components/divider/VerticalDivider";
import HorizontalDivider from "../../components/divider/HorizontalDivider";
import { Link } from "react-router-dom";

const Transaction: React.FC = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showLastInfo, setShowLastInfo] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [mySelectedBank, setMySelectedBank] = useState("");
  const [계좌번호, set계좌번호] = useState("");
  const [입력금액, set입력금액] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiver, setReceiver] = useState("홍길동");
  // const [memoCont, setMemoCont] = useState("메모 남기기");

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
    if (계좌번호.length >= 10 && 계좌번호.length <= 14) {
      setShowBankDetails(true);
    } else if (계좌번호 === "") {
      alert("계좌번호를 입력하세요.");
    } else {
      alert("계좌번호를 확인하세요.");
    }
  };
  const handleInputClick2 = () => {
    setShowLastInfo(true);
  };
  const handleInputClick3 = () => {
    setShowConfirm(true);
  };

  const handleButtonClick = () => {
    handle금액();
    handleInputClick2();
    setShowLastInfo(true);
  };

  const handleBankSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = event.target.value;
    console.log(selectedBank);
    setSelectedBank(selectedBank);
  };
  const handleMyBankSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const mySelectedBank = event.target.value;
    console.log(mySelectedBank);
    setMySelectedBank(mySelectedBank);
    if (amountRef.current) {
      amountRef.current.focus();
    }
  };

  const handle계좌번호 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 계좌번호 = event.target.value;
    console.log(계좌번호);
    set계좌번호(계좌번호);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReceiver = (event: React.ChangeEvent<HTMLInputElement>) => {
    const receiver = event.target.value;
    setReceiver(receiver);
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
        <T.NumInput
          placeholder={"계좌번호 입력 (- 제외)"}
          onChange={handle계좌번호}
          ref={accountNumberRef}
        />
        <T.Button onClick={handleInputClick}>입력</T.Button>
        {showBankDetails && <T.H1>어떤 계좌로 보낼까요?</T.H1>}
        {showBankDetails && (
          <>
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
            <T.Divider>
              <span>또는</span>
            </T.Divider>
          </>
        )}

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
        <HorizontalDivider width="90%" />
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
        <HorizontalDivider width="90%" />
      </T.FirstPage>

      {selectedBank && (
        <>
          <T.SecondPage className={showLastInfo ? "fade-in" : ""}>
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
                <option value="내 국민은행">국민은행</option>
                <option value="내 신한은행">신한은행</option>
                <option value="내 우리은행">우리은행</option>
                <option value="내 하나은행">하나은행</option>
                <option value="내 농협은행">농협은행</option>
              </T.Select>
              <p>계좌에서</p>
            </T.MyBank>
            <T.H1>{selectedBank} 계좌로</T.H1>
            <T.H5>계좌번호 {계좌번호}</T.H5>
            <T.NumInput
              placeholder={"얼마를 보낼까요?"}
              ref={amountRef}
              onChange={금액}
            />
            <T.Button onClick={handleButtonClick}>확인</T.Button>
            {showLastInfo && (
              <>
                <HorizontalDivider width="90%" />
                <T.H1>{selectedBank} 계좌로</T.H1>
                <T.H5>계좌번호 {계좌번호}</T.H5>
                <h2 style={{ marginBottom: "20%" }}>{입력금액}을 보낼까요?</h2>
                <T.TransactionInfo>
                  <T.P>받는 분에게 표시</T.P>
                  <T.P onClick={handleOpenModal} style={{ cursor: "pointer" }}>
                    {receiver} &gt;
                  </T.P>
                </T.TransactionInfo>
                <T.TransactionInfo>
                  <T.P>출금 계좌</T.P>
                  <T.P>{mySelectedBank}</T.P>
                </T.TransactionInfo>
                <T.TransactionInfo>
                  <T.P>입금 계좌</T.P>
                  <T.P>
                    {selectedBank} {계좌번호}
                  </T.P>
                </T.TransactionInfo>
                <T.Button
                  onClick={handleInputClick3}
                  style={{ marginTop: "30px" }}
                >
                  보내기
                </T.Button>
              </>
            )}
          </T.SecondPage>
        </>
      )}

      {isModalOpen && (
        <>
          <T.Overlay onClick={handleCloseModal} />
          <T.Modal>
            <T.TextInput placeholder={receiver} onChange={handleReceiver} />
            <T.Button onClick={handleCloseModal}>입력</T.Button>
          </T.Modal>
        </>
      )}

      {showConfirm && (
        <T.ThirdPage>
          <T.img src={`${process.env.PUBLIC_URL}/images/check-circle.svg`} />
          <T.H1>{selectedBank} 계좌로</T.H1>
          <h2 style={{ marginBottom: "20%" }}>{입력금액}을 보냈어요!</h2>
          {/* <T.MemoBtn onClick={handleOpenModal}>메모 남기기</T.MemoBtn> */}
          <T.Link to="/main">
            <T.Button>확인</T.Button>
          </T.Link>
        </T.ThirdPage>
      )}
    </T.MainContainer>
  );
};

export default Transaction;
