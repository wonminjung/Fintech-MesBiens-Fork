import React, { useState } from "react";
import L from "../login/LoginStyle";
import DefaultInputField from "../../components/inputfield/InputField";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Submit form logic here
    console.log({ name, email, username, password, confirmPassword });
  };

  return (
      <L.Body>
        <L.MainContainer>
          <L.Container_top>
              <h1 style={{fontSize:"3em"}}>Sign Up</h1>
          </L.Container_top>
          <L.Container_bottom>
              <L.P_tag>
                회원정보를 모두 입력하세요.
              </L.P_tag>
              <form onSubmit={handleSubmit}>
                <DefaultInputField
                  type="text"
                  id="name"
                  placeholder="회원 이름 (홍길동)"
                  value={name}
                  onChange={(e: string) => setName(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="email"
                  id="email"
                  placeholder="회원 이메일 (fintech@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="text"
                  id="username"
                  placeholder="회원 ID (fintech123)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="password"
                  id="password"
                  placeholder="비밀번호 (123456)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="password"
                  id="confirm-password"
                  placeholder="비밀번호 확인 (123456)"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="submit" className="sign-up-btn">
                  Sign Up
                </button>
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
                    이미 회원이신가요? <a href="/login">로그인</a>하러가기
                  </p>
                </div>
                <div className="intro_page">
                  <p>
                    <a href="/intro">홈으로</a> 나가기
                  </p>
                </div>
              </form>
          </L.Container_bottom>
        </L.MainContainer>
      </L.Body>
  );
};

export default SignupPage;
