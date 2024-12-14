import React, { useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import VerticalDivider from "../../../components/divider/VerticalDivider";
import PlainButton from "../../../components/button/PlainButton";
import { useAuth } from "../../../lib/AuthContext";
import DefaultButton from "../../../components/button/DefaultButton";
import { useCookies } from "react-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  // 리덕스 불러오는 코드

  const { userID } = useAuth(); // Context에서 userID 가져오기
  const [cookies, setCookie, removeCookie] = useCookies<string>([
    "remeberUserID",
  ]); // 쿠키 가져오기

  const [SearchVisible, setSearchVisible] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!SearchVisible);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    console.log("로그아웃되었습니다.");
    alert("로그아웃되었습니다.");
    removeCookie("rememberUserID");
    // 쿠키 삭제 등의 로직을 추가해야 함.
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWelcome>{userID}님 환영합니다.</S.HeaderWelcome>
      {cookies.rememberUserID && ( // 쿠키가 있을 때만 로그아웃 버튼 표시
        <DefaultButton onClick={handleLogout}>로그아웃</DefaultButton>
      )}
      <S.SearchContainer>
        {SearchVisible && (
          <S.SearchBarContainer>
            <S.SearchInput type="text" placeholder="Search.." />
          </S.SearchBarContainer>
        )}
        <PlainButton onClick={toggleSearchBar}>
          <img
            src={`${process.env.PUBLIC_URL}/images/SearchIcon.png`}
            alt="Search"
          />
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
        </PlainButton>
        <S.LoginSignupContainer>
          <VerticalDivider />
          <Link to="/myPage">
            <PlainButton>MYPAGE</PlainButton>
          </Link>
          <VerticalDivider />
          <Link to="/">
            <PlainButton>HOME</PlainButton>
          </Link>
          {/* <VerticalDivider />
          <Link to="/login">
            <PlainButton>로그인</PlainButton>
          </Link>
          <VerticalDivider />
          <Link to="/signup">
            <PlainButton>회원가입</PlainButton>
          </Link> */}
        </S.LoginSignupContainer>
      </S.SearchContainer>
    </S.HeaderContainer>
  );
};

export default Header;
