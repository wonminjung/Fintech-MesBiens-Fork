import React from "react";
import S from "./style";
import { Button } from "../../../components/button/style";
import AccountListContainer from "./account/AccountListContainer";

const ContentAreaContainer: React.FunctionComponent = (): JSX.Element => {
  return (
    <S.ContentAreaContainer>
      <S.SelectedMenuContentContainer>
        <S.SelectedMenuHeaderContainer>
          <S.MenuTitle>계좌 관리</S.MenuTitle>

          <S.SearchAndSortWrapper>
            {/* 검색창 */}
            <S.AccountSearch />
            <Button>정렬 순서</Button>
          </S.SearchAndSortWrapper>
        </S.SelectedMenuHeaderContainer>

        {/* 계좌 목록 */}
        <AccountListContainer />
      </S.SelectedMenuContentContainer>
    </S.ContentAreaContainer>
  );
};

export default ContentAreaContainer;
