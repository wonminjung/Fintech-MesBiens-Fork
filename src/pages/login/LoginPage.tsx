import React from "react";
import { useNavigate } from "react-router-dom";
import L from './LoginStyle';
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
        <L.MainContainer>
          <L.Container_top>
            <h1 style={{fontSize:"3em"}}>Login</h1>
          </L.Container_top>
          <L.Container_bottom>
              <L.P_tag>
                회원 ID와 비밀번호를 입력하세요.
              </L.P_tag>
              <form onSubmit={handleLogin}>
                <DefaultInputField
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
                <L.Divider>
                  <span>또는</span>
                </L.Divider>
                <L.SNSLogin>
                  <L.SNSButton id={"NaverLogin"}></L.SNSButton>
                  <L.SNSButton id={"KakaoLogin"}></L.SNSButton>
                  <L.SNSButton id={"GoogleLogin"}></L.SNSButton>
                </L.SNSLogin>
                <L.SignUp>
                  <L.P_tag>
                    첫 방문이신가요? <a href="/signup">회원가입</a>
                    하러가기
                  </L.P_tag>
                  <L.P_tag>
                    <a href="/findID">
                      아이디/비밀번호
                    </a>{" "}
                    찾기
                  </L.P_tag>
                </L.SignUp>
                <L.IntroPage>
                  <L.P_tag>
                    <a href="/intro">
                      홈으로
                    </a> 나가기
                  </L.P_tag>
                </L.IntroPage>
              </form>
          </L.Container_bottom>
        </L.MainContainer>
      </L.Body>
  );
};

export default LoginPage;
