import React from "react";
import { useNavigate } from "react-router-dom";
import L from "./LoginStyle";
import DefaultButton from "../../components/button/DefaultButton";
import DefaultInputField from "../../components/inputfield/InputField";
import VerticalDivider from "../../components/divider/VerticalDivider";

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
          <h1 style={{ fontSize: "3em" }}>로그인</h1>
        </L.Container_top>
        <L.Container_bottom>
          <L.P_tag>회원 ID와 비밀번호를 입력하세요.</L.P_tag>
          <form onSubmit={handleLogin}>
            <DefaultInputField
              id="username"
              placeholder="회원 ID (fintech123)"
              required
            />
            <br />
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
          </form>
          <L.Divider>
            <span>또는</span>
          </L.Divider>
          <L.SNSLogin>
            <L.SNSButton id={"NaverLogin"} />
            <L.SNSButton id={"KakaoLogin"} />
            <L.SNSButton id={"GoogleLogin"} />
          </L.SNSLogin>
        </L.Container_bottom>
        <L.SignUp>
          <L.P_tag><a href="/signup">회원가입</a></L.P_tag>
          <VerticalDivider height={"20px"} margin={"20px"}/>
          <L.P_tag><a href="/findID">아이디/비밀번호 찾기</a></L.P_tag>
          <VerticalDivider height={"20px"} style={{marginLeft:"20px"}}/>
          <L.P_tag style={{margin: "20px"}}>
            <a href="/intro">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default LoginPage;
