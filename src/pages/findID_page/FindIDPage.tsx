import React, { useState } from "react";
import "./FindIDPage.css";

const FindIDPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("findID");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmID, setConfirmID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleFindIDSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle Find ID logic
    console.log({ name, email });
  };

  const handleFindPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle Find Password logic
    console.log({ name, username, email, password });
  };

  return (
    <div className="container">
      <div className="container_top">
        <div className="top">
          <h1>ID / 비밀번호 찾기</h1>
        </div>
      </div>
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "findID" ? "active" : ""}`}
          onClick={() => handleTabClick("findID")}
        >
          아이디 찾기
        </button>
        <button
          className={`tablinks ${activeTab === "findPassword" ? "active" : ""}`}
          onClick={() => handleTabClick("findPassword")}
        >
          비밀번호 찾기
        </button>
      </div>
      <div className="container_bottom">
        {activeTab === "findID" && (
          <div className="tab-content active" id="findID">
            <p className="bottom_cont">
              <strong>등록된 이메일로 ID 찾기</strong>
              <br />
              <br />
              등록된 <strong>회원 이름과 이메일 주소</strong> 를 입력해주세요.
            </p>
            <form onSubmit={handleFindIDSubmit}>
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
                placeholder="회원 이메일 (fintech123@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="confirm-btn">
                인증번호 받기
              </button>
              <div className="divider"></div>
              <input
                type="text"
                id="confirm-id"
                placeholder="인증번호 입력"
                value={confirmID}
                onChange={(e) => setConfirmID(e.target.value)}
                required
              />
              <button type="submit" className="confirm-btn">
                확인
              </button>
            </form>
            <div className="divider"></div>
            <div className="showid">회원님의 ID는 000입니다.</div>
            <div className="sign-up">
              <p>
                <a href="/login">로그인</a> 하러가기
              </p>
              <div className="intro_page">
                <p>
                  <a href="/intro" className="intro_page2">
                    홈으로
                  </a>{" "}
                  나가기
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "findPassword" && (
          <div className="tab-content active" id="findPassword">
            <p className="bottom_cont">
              <strong>등록된 이메일로 비밀번호 찾기</strong>
              <br />
              <br />
              등록된 <strong>회원 이메일</strong> 주소를 입력해주세요.
            </p>
            <form onSubmit={handleFindPasswordSubmit}>
              <input
                type="text"
                id="nameforpassword"
                placeholder="회원 이름 (홍길동)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                id="idforpassword"
                placeholder="회원 ID (fintech123)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                id="emailforpassword"
                placeholder="회원 이메일 (fintech123@gmail.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="confirm-btn">
                비밀번호 찾기
              </button>
              <div className="divider"></div>
              <input
                type="password"
                id="passwordreset"
                placeholder="비밀번호 입력"
                value={passwordReset}
                onChange={(e) => setPasswordReset(e.target.value)}
                required
              />
              <input
                type="password"
                id="passwordcheck"
                placeholder="비밀번호 확인"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
              <button type="submit" className="confirm-btn">
                비밀번호 재설정
              </button>
            </form>
            <div className="sign-up">
              <p>
                <a href="/login">로그인</a> 하러가기
              </p>
              <div className="intro_page">
                <p>
                  <a href="/intro" className="intro_page2">
                    홈으로
                  </a>{" "}
                  나가기
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindIDPage;
