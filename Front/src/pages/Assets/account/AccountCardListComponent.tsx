import React, { useCallback, useRef, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Info } from "./AccountListContainer";

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
  const [displayBtn, setDisplayBtn] = useState<boolean>(false);
  const handleDisplay = useCallback(
    (): void => setDisplayBtn((prevState: boolean): boolean => !prevState),
    []
  );

  const accountNumber = "123456789-12-123456";

  // 복사 버튼 상태
  const [copy, setCopy] = useState<boolean>(false);
  const lastClickTime = useRef<number | null>(null);
  const handleCopy = useCallback(async (): Promise<void> => {
    const now = Date.now();

    if (lastClickTime.current && now - lastClickTime.current < 2000) {
      return; // 스로틀 활성화 중에는 복사 방지
    }

    lastClickTime.current = now; // 현재 시간을 기록

    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopy(true);

      setTimeout(() => {
        setCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Faild to copy account number : ", error);
    }
  }, []);

  // 카드리스트 메뉴 상태
  const [isCardClicked, setIsCardClicked] = useState<boolean>(false);
  const handleIsCardClicked = useCallback(
    (): void => setIsCardClicked((prevState: boolean): boolean => !prevState),
    []
  );

  return (
    <S.FilledAccountWrapper>
      {/* 카드리스트 상단 */}
      {/* <S.FilledAccountHeader> */}
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

      {/* </S.FilledAccountHeader> */}

      {/* 카드리스트 하단 */}
      <S.FilledFooter>
        <S.BalanceHideBtn>
          <input id={`balance-hide-btn${index}`} type="checkbox" />
          <label htmlFor={`balance-hide-btn${index}`} onClick={handleDisplay} />
        </S.BalanceHideBtn>
        <S.Balance>
          <span className={displayBtn ? "balance-hidden" : ""}>
            {balance.toLocaleString()} 원
          </span>
        </S.Balance>
        <S.RemittanceBtn>송금</S.RemittanceBtn>
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
