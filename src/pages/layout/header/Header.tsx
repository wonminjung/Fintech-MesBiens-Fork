import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./style";
import VerticalDivider from "../../../components/divider/VerticalDivider";
import PlainButton from "../../../components/button/PlainButton";
import { useAuth } from "../../../lib/AuthContext";
import { useCookies } from "react-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  // 리덕스 불러오는 코드

  const [cookies, setCookie, removeCookie] = useCookies<string>(["userID"]); // 쿠키 가져오기
  const navigate = useNavigate(); // 리다이렉션을 위한 navigate 훅 사용

  const [SearchVisible, setSearchVisible] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!SearchVisible);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    console.log("로그아웃되었습니다.");
    alert("로그아웃되었습니다.");
    removeCookie("userID");
    navigate("/");
    // 페이지 세로고침
    window.location.reload();
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWelcome>
        {cookies.userID
          ? `${cookies.userID}님 환영합니다.`
          : "Welcome to MesBiens"}
        {cookies.userID && ( // 쿠키가 있을 때만 로그아웃 버튼 표시
          <S.Logout_btn onClick={handleLogout}>로그아웃</S.Logout_btn>
        )}
      </S.HeaderWelcome>

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
