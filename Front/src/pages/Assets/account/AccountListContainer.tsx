import React, { useEffect, useState } from "react";
import S from "./style";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCardListComponent from "./AccountCardListComponent";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";

export type Info = {
  id: number;
  logo: string;
  bankname: string;
  accountnumber: string;
  balance: number;
};

const AccountListContainer: React.FunctionComponent = (): JSX.Element => {
<<<<<<< HEAD
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
      accountnumber: "110-496-238490",
      balance: 1_400_000,
    },
    {
      id: 4,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/hana.jpg`,
      bankname: "KEB하나은행",
      accountnumber: "194-239-347989",
      balance: 5_000_000,
    },
    {
      id: 5,
      logo: `${process.env.PUBLIC_URL}/images/bankimages/ibk1.jpg`,
      bankname: "IBK기업은행",
      accountnumber: "484-069485-22-358",
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
=======
  const accountList = new Array(3).fill(1);
  const [isAccount, setIsAccount] = useState(false);
  const { handleModal } = ModalFunc();
>>>>>>> 3aeac9260fe6ce376195441243f75ba7a6ea30dd

  return (
    <S.AccountListContainer>
      {/* 계좌 없을 때 */}
<<<<<<< HEAD
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
=======
      <S.AccountCardListWrapper>
        {/* AccountCardList map 으로 반복 예정 */}
        {isAccount ? 
            (
              accountList.map((_, index: number): JSX.Element => (
              <S.AccountCardListWrapper key={index}>
                  <AccountCardListComponent index={index} />
              </S.AccountCardListWrapper>
              ))
            )
            : 
            (
              <S.EmptyAccountWrapper>
              <S.AddAccountBtn onClick={() => handleModal(ModalKeys.ADD_ACCCOUNT)}>
                  <FontAwesomeIcon icon={faPlus} />
              </S.AddAccountBtn>
              <S.EmptyAccountDescription>
                  등록된 계좌가 없습니다!
              </S.EmptyAccountDescription>
              <S.EmptyAccountTip>
                  Tip. 그거 알고 계셨나요? 계좌가 없으면 돈이 없다는 사실
              </S.EmptyAccountTip>
              </S.EmptyAccountWrapper>
            )
        }
      </S.AccountCardListWrapper>

      {/* 계좌 있을 때, 임시용 */}
      {accountList.map((_, index: number): JSX.Element => (
          <S.AccountCardListWrapper key={index}>
            <AccountCardListComponent index={index} />
          </S.AccountCardListWrapper>
      ))}
>>>>>>> 3aeac9260fe6ce376195441243f75ba7a6ea30dd
    </S.AccountListContainer>
  );
};

export default AccountListContainer;
