import React, { useState } from "react";
import "../css/SignupPage.css";

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
    <div className="container">
      <div className="container_top">
        <div className="top">
          <h1>Welcome To TB!</h1>
        </div>
      </div>
      <div className="container_bottom">
        <div className="bottom">
          <h2 className="bottom_cont">회원가입</h2>
          <p className="bottom_cont">
            <strong>환영합니다!</strong> <br />
            <br />
            회원정보를 모두 입력하세요.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="회원 이름 (홍길동)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="회원 이메일 (fintech@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              id="username"
              placeholder="회원 ID (fintech123)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="비밀번호 (123456)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
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
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
