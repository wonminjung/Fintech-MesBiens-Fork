import React from "react";

const Header: React.FC = () => {
  return (
    <div className="header">
      <h2 className="welcome">###님 환영합니다.</h2>
      <div className="search_bar">
        <input type="text" className="search" placeholder="Search" />
        <button type="button" className="search-btn">
          검색
        </button>
      </div>
      <div className="login_sign_up">
        <a href="/login" type="button" className="login-btn">
          로그인
        </a>
        <a href="/signup" type="button" className="sign-up-btn">
          회원가입
        </a>
      </div>
    </div>
  );
};

export default Header;
