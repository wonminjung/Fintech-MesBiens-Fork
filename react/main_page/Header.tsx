import React from 'react'
// import {Link} from 'react-router-dom'

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
        {/* <Link to="/login" type="button" className="login-btn">
          로그인
        </Link> */}
        <a href="sign-up_page.html" type="button" className="sign-up-btn">
          회원가입
        </a>
      </div>
    </div>
  )
}

export default Header
