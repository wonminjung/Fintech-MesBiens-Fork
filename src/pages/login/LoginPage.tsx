import React from "react";
import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";
import L from './LoginStyle';
import Elements_source from "../../components/Elements_source";
import DefaultButton from "../../components/button/DefaultButton";
import DefaultInputField from "../../components/inputfield/InputField";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // window.location.href = "main_page.html";
    navigate("/main");
  };

  return (
      <L.Body>
        <L.LoginContainer>
          <L.LoginContainer_top>
            <h1 style={{fontSize:"3em"}}>Welcome Back!</h1>
          </L.LoginContainer_top>
          <L.LoginContainer_bottom>
              <h2 style={{fontSize:"2em"}}>로그인</h2>
              <L.P_tag>
                <strong>환영합니다!</strong>
                <br />
                <br />
                회원 ID와 비밀번호를 입력하세요.
              </L.P_tag>
              <form onSubmit={handleLogin}>
                <DefaultInputField
                    type="text"
                    id="username"
                    placeholder="회원 ID (fintech123)"
                    required
                />
                <br/>
                <DefaultInputField
                  type="password"
                  id="password"
                  placeholder="비밀번호 (123456)"
                  required
                />

                <L.RememberMe>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">ID 기억하기</label>
                </L.RememberMe>

                <DefaultButton width="100%">Login</DefaultButton>

                <div className="divider">
                  <span>또는</span>
                </div>
                <div className="sns-login">
                  <button type="button" className="naver_login"></button>
                  <button type="button" className="kakao_login"></button>
                  <button type="button" className="google_login"></button>
                </div>
                <L.SignUp>
                  <L.P_tag>
                    첫 방문이신가요? <a href="/signup">회원가입</a>
                    하러가기
                  </L.P_tag>
                  <L.P_tag>
                    <a href="/findID" className="forgot-password">
                      아이디/비밀번호
                    </a>{" "}
                    찾기
                  </L.P_tag>
                </L.SignUp>
                <L.IntroPage>
                  <L.P_tag>
                    <a href="/intro" className="intro_page2">
                      홈으로
                    </a> 나가기
                  </L.P_tag>
                </L.IntroPage>
              </form>
          </L.LoginContainer_bottom>
        </L.LoginContainer>
      </L.Body>
  );
};

export default LoginPage;
