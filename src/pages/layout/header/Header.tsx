import React from "react";
import S from "./style";

const Header: React.FunctionComponent = (): JSX.Element => {
  return (
    <S.HeaderContainer>
      <S.HeaderWelcome>###님 환영합니다.</S.HeaderWelcome>

      <S.SearchBarContainer>
        <S.SearchInput type="text" placeholder="Search" />
        <S.SearchBtn type="button">검색</S.SearchBtn>
      </S.SearchBarContainer>

      <S.LoginSignupContainer>
        <S.LoginSignupBtn href="/login" type="button">
          로그인
        </S.LoginSignupBtn>
        <S.LoginSignupBtn href="/signup" type="button">
          회원가입
        </S.LoginSignupBtn>
      </S.LoginSignupContainer>
    </S.HeaderContainer>
  );
};

export default Header;
