import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import S from './LoginStyle';
import Elements_source from "../../global/Elements_source";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // window.location.href = "main_page.html";
    navigate("/main");
  };

  return (
    <S.LoginContainer>
      <S.LoginContainer_top>
        <div className="top">
          <h1>Welcome Back!</h1>
        </div>
      </S.LoginContainer_top>
      <S.LoginContainer_bottom>
        <div className="bottom">
          <h2 className="bottom_cont">로그인</h2>
          <p className="bottom_cont">
            <strong>환영합니다!</strong> <br />
            <br />
            회원 ID와 비밀번호를 입력하세요.
          </p>
          <form onSubmit={handleLogin}>
            <Elements_source.InputField
                type="text"
                id="username"
                placeholder="회원 ID (fintech123)"
                required
            />
            <br/>
            <Elements_source.InputField
              type="password"
              id="password"
              placeholder="비밀번호 (123456)"
              required
            />

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">ID 기억하기</label>
            </div>

            <Elements_source.DefaultButton width="80%">Login</Elements_source.DefaultButton>

            <div className="divider">
              <span>또는</span>
            </div>
            <div className="sns-login">
              <button type="button" className="naver_login"></button>
              <button type="button" className="kakao_login"></button>
              <button type="button" className="google_login"></button>
            </div>
            <div className="sign-up">
              <p>
                첫 방문이신가요? <a href="/signup">회원가입</a>
                하러가기
              </p>
              <p>
                <a href="/findID" className="forgot-password">
                  아이디/비밀번호
                </a>{" "}
                찾기
              </p>
            </div>
            <div className="intro_page">
              <p>
                <a href="/intro" className="intro_page2">
                  홈으로
                </a>{" "}
                나가기
              </p>
            </div>
          </form>
        </div>
      </S.LoginContainer_bottom>
    </S.LoginContainer>
  );
};

export default LoginPage;
