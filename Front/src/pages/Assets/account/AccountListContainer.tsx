import React, { useEffect, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

const AccountListContainer: React.FC = () => {
  const [bankInfo, setBankInfo] = useState<Info[]>([]);
  const { handleModal } = ModalFunc();

  const fetchAccountsData = async () => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/dummyDatas/accountData.json`
      );
      if (!response.ok) {
        throw new Error("등록된 계좌가 없습니다.");
      }
      const data: Info[] = await response.json();
      setBankInfo(data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchAccountsData();
  }, []);

  return (
    <S.AccountListContainer>
      {bankInfo.length > 0 ? (
        bankInfo.map((account, index /* index 추가 */) => (
          <S.AccountCardListWrapper>
            <AccountCardListComponent index={index} info={account} />{" "}
            {/*index 전달 */}
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
