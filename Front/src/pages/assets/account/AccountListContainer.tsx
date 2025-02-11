import React, { useEffect, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AccountCardListComponent from "./AccountCardListComponent";
import ModalFunc from "../../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../../components/modal/keys/ModalKeys";
import { Account } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/store/store";

type Props = {
  bankInfo: Account[];
  setBankInfo: React.Dispatch<React.SetStateAction<Account[]>>;
}

const AccountListContainer: React.FunctionComponent<Props> = ({ bankInfo, setBankInfo }): JSX.Element => {
  const { handleModal } = ModalFunc();
  const { member } = useSelector((state: RootState) => state.user);
  const [ dataLoading, setDataLoading ] = useState<boolean>(false);

  const getAccountList = async () => {
      const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(
            {
              memberNo: member.memberNo
            }
          )
        }
      );
      const acctList: Account[] = await response.json();

      return { acctList, response };
  };

  useEffect(() => {
    setDataLoading(true);

    getAccountList()
    .then(({ acctList, response }) => {
      if(response.status === 200 && response.ok) {
        setBankInfo(acctList);
        setDataLoading(false);
      }
    })
    .catch(() => { console.log("데이터 가져오기 실패") });
  }, []);

  return (
    <S.AccountListContainer>
      {bankInfo.length > 0 ? (
        bankInfo.map((acct, index) => (
          <S.AccountCardListWrapper key={acct.accountNo}>
            <AccountCardListComponent index={index} acct={acct} bankInfo={bankInfo} setBankInfo={setBankInfo} />
          </S.AccountCardListWrapper>
        ))
      ) : (
        <S.AccountEmptyCardListWrapper>
          <S.EmptyAccountWrapper>
            <S.AddAccountBtn onClick={() => handleModal(ModalKeys.ADD_ACCOUNT)}>
              <FontAwesomeIcon icon={faPlus} />
            </S.AddAccountBtn>
            <S.EmptyAccountDescription>
              등록된 계좌가 없습니다!
            </S.EmptyAccountDescription>
            <S.EmptyAccountTip>
              Tip. 그거 알고 계셨나요? 계좌가 없으면 돈이 없다는 사실
            </S.EmptyAccountTip>
          </S.EmptyAccountWrapper>
        </S.AccountEmptyCardListWrapper>
      )}
    </S.AccountListContainer>
  );
};

export default AccountListContainer;
