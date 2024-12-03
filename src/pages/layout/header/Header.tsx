import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import VerticalDivider from "../../../components/divider/VerticalDivider";
import PlainButton from "../../../components/button/PlainButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }): JSX.Element => {
  // 리덕스 불러오는 코드

  const [SearchVisible, setSearchVisible] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!SearchVisible);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWelcome>{userName}님 환영합니다.</S.HeaderWelcome>{" "}
      {/* 값 입력 수정 필요 */}
        <S.SearchContainer>

        {SearchVisible && (
        <S.SearchBarContainer>
          <S.SearchInput type="text" placeholder="Search" />
        </S.SearchBarContainer>
      )}
      <PlainButton onClick={toggleSearchBar}>
        <img
          src={`${process.env.PUBLIC_URL}/images/SearchIcon.png`}
          alt="Search"
        />
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
      </PlainButton>
      <VerticalDivider />
      <S.LoginSignupContainer>
        <Link to="/login">
          <PlainButton>로그인</PlainButton>
        </Link>
        <VerticalDivider />
        <Link to="/signup">
          <PlainButton>회원가입</PlainButton>
        </Link>
      </S.LoginSignupContainer>
          </S.SearchContainer>
    </S.HeaderContainer>
  );
};

export default Header;
