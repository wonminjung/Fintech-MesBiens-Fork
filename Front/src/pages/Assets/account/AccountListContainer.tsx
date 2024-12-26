import React, { useEffect, useState } from "react";
import S from "./style";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCardListComponent from "./AccountCardListComponent";

export type Info = {
  id: number;
  logo: string;
  bankname: string;
  accountnumber: string;
  balance: number;
};

const AccountListContainer: React.FunctionComponent = (): JSX.Element => {
  const [bankInfo, setBankInfo] = useState<Info[]>([
    {
      id: 1,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/kb1.jpg`,
      bankname: "KB국민은행",
      accountnumber: "942902-00-137892",
      balance: 2_000_000,
    },
    {
      id: 2,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/woori.png`,
      bankname: "우리은행",
      accountnumber: "1002-463-489938",
      balance: 1_500_000,
    },
    {
      id: 3,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/shinhan.png`,
      bankname: "신한은행",
      accountnumber: "1249238-1238-99277",
      balance: 1_400_000,
    },
    {
      id: 4,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/hana.jpg`,
      bankname: "KEB하나은행",
      accountnumber: "3478-384-98339",
      balance: 5_000_000,
    },
    {
      id: 5,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/ibk1.jpg`,
      bankname: "IBK기업은행",
      accountnumber: "12312-12314-12412",
      balance: 3_000_000,
    },
  ]);

  const [isAccount, setIsAccount] = useState(true);

  useEffect(() => {
    // 실행할함수
    console.log(bankInfo.length);
    if (bankInfo.length === 0) {
      setIsAccount(() => !isAccount);
    }
  }, [bankInfo]);

  return (
    <S.AccountListContainer>
      {/* 계좌 없을 때 */}
      {/* AccountCardList map 으로 반복 예정 */}
      {isAccount ? (
        bankInfo.map(
          (info: Info, index: number): JSX.Element => (
            <S.AccountCardListWrapper>
              <AccountCardListComponent
                key={info.id}
                info={info}
                index={index}
              />
            </S.AccountCardListWrapper>
          )
        )
      ) : (
        <S.AccountCardListWrapper>
          <S.EmptyAccountWrapper>
            <S.AddAccountBtn>
              <FontAwesomeIcon icon={faPlus} />
            </S.AddAccountBtn>
            <S.EmptyAccountDescription>
              등록된 계좌가 없습니다!
            </S.EmptyAccountDescription>
            <S.EmptyAccountTip>
              Tip. 그거 알고 계셨나요? 계좌가 없으면 돈이 없다는 사실
            </S.EmptyAccountTip>
          </S.EmptyAccountWrapper>
        </S.AccountCardListWrapper>
      )}
    </S.AccountListContainer>
  );
};

export default AccountListContainer;
