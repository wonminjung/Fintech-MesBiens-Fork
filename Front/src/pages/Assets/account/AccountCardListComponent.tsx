import React, { useCallback, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Info } from "./AccountListContainer";
import { useNavigate } from "react-router-dom";
import ToggleBtn from "../../../components/button/ToggleButton";

type Props = {
  index: number;
  info: Info;
};

const AccountCardListComponent: React.FunctionComponent<Props> = ({
  index,
  info,
}): JSX.Element => {
  const { logo, bankname, accountnumber, balance } = info;

  // 잔액 숨기기 상태
  const [displayBtn, setDisplayBtn] = useState<boolean>(true);
  const handleDisplay = useCallback(() => {
    setDisplayBtn((prevState) => !prevState);
  }, []);

  // 복사 버튼 상태
  const [copy, setCopy] = useState<boolean>(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(accountnumber);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch (error) {
      console.error("Failed to copy account number: ", error);
    }
  }, [accountnumber]);

  // 카드리스트 메뉴 상태
  const [isCardClicked, setIsCardClicked] = useState<boolean>(false);
  const handleIsCardClicked = useCallback(() => {
    setIsCardClicked((prevState) => !prevState);
  }, []);

  const navigate = useNavigate();
  const handleTransaction = () => {
    navigate("/transaction");
  };

  return (
    <S.FilledAccountWrapper>
      <S.BankInfoContainer>
        <S.BankLogo src={logo} alt="은행 로고" />
        <S.BankInfo>
          <h4>{bankname}</h4>
          <h4>{accountnumber}</h4>
        </S.BankInfo>

        <S.AccountNumberCopyBtn onClick={handleCopy}>
          <img
            src={`${process.env.PUBLIC_URL}/images/myPage/account/copy-icon.svg`}
            alt="복사 버튼"
          />
        </S.AccountNumberCopyBtn>
        {copy && <S.CopyMessage>복사가 완료되었습니다.</S.CopyMessage>}
      </S.BankInfoContainer>

      <S.FilledFooter>
        <S.Balance>
          <span className={displayBtn ? "balance-hidden" : ""}>
            {balance.toLocaleString()} 원
          </span>
          <S.BalanceHideBtn>
            <input id={`balance-hide-btn${index}`} type="checkbox" />
            <label
              htmlFor={`balance-hide-btn${index}`}
              onClick={handleDisplay}
            />
          </S.BalanceHideBtn>
        </S.Balance>
        <S.RemittanceBtn onClick={handleTransaction}>송금</S.RemittanceBtn>
      </S.FilledFooter>
      <S.CardListMenuContainer>
        <S.CardlistMenuBtn onClick={handleIsCardClicked}>
          <FontAwesomeIcon icon={faEllipsis} />
        </S.CardlistMenuBtn>
        {isCardClicked && (
          <S.CardlistDropdown>
            <S.CardlistDropDownItems>계좌 정보 수정</S.CardlistDropDownItems>
            <S.CardlistDropDownItems>계좌 삭제</S.CardlistDropDownItems>
          </S.CardlistDropdown>
        )}
      </S.CardListMenuContainer>
    </S.FilledAccountWrapper>
  );
};

export default AccountCardListComponent;
