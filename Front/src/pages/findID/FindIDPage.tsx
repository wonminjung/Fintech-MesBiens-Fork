import React, { useState } from "react";
import L from "../login/LoginStyle";
import DefaultInputField from "../../components/inputfield/InputField";
import DefaultButton from "../../components/button/DefaultButton";
import VerticalDivider from "../../components/divider/VerticalDivider";
import { redirect } from "react-router-dom";
// import "./FindIDPage.css";

const FindIDPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("findID");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호
  const [confirmID, setConfirmID] = useState(""); // 사용자가 입력한 인증번호
  const [isVerified, setIsVerified] = useState(false); // 인증 여부
  const [foundID, setFoundID] = useState(""); // 찾은 ID 저장
  const [resetSuccess, setResetSuccess] = useState(false); // 비밀번호 변경 성공 여부
  const [passwordReset, setPasswordReset] = useState(""); // 새 비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인
  const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증번호 입력 필드 및 버튼 표시 여부부
  const [showID, setShowID] = useState(false);
  const [showPwdReset, setShowPwdReset] = useState(false);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setShowVerificationInput(false);
    setShowID(false);
    setShowPwdReset(false);
  };

  // 인증번호 요청
  const handleRequestVerificationCode = async () => {
    setShowVerificationInput(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:7200/members/request-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }), // 이메일 전송
        }
      );

      if (response.ok) {
        alert("인증번호가 이메일로 전송되었습니다.");
      } else {
        const errorText = await response.text();
        alert(`인증번호 전송 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("인증번호 요청 오류:", error);
      alert("서버 요청 실패");
    }
  };

  // 인증번호 검증
  const handleVerifyCode = async () => {
    try {
      console.log("입력된 인증번호:", confirmID); // 여기서 입력된 인증번호를 확인
      const response = await fetch(
        "http://localhost:7200/members/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: confirmID }), // 이메일과 입력된 인증번호
        }
      );

      if (response.ok) {
        alert(`인증 성공!`);
        // 비밀번호 수정 페이지로 이동하거나 비밀번호 변경 기능을 활성화합니다.
        setShowID(true);
      } else {
        const errorText = await response.text();
        alert(`인증 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("인증번호 검증 오류:", error);
      alert("서버 요청 실패");
    }

    try {
      const response = await fetch(
        `http://localhost:7200/members/find-id/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const textData = await response.text();
      console.log("서버 응답 (문자열):", textData);

      try {
        const data = JSON.parse(textData);
        console.log("파싱된 데이터:", data);
        console.log("찾은 아이디:", data.id);

        if (data.id) {
          setFoundID(data.id);
          setIsVerified(true);
        } else {
          alert("아이디를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
        alert("응답 데이터를 처리할 수 없습니다.");
      }
    } catch (error) {
      console.error("아이디 찾기 오류:", error);
      alert("서버 오류 발생");
    }
  };

  // 비밀번호 재설정 요청
  const handleFindPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:7200/members/find-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.text(); // 백엔드 응답이 단순한 문자열이므로 .text()로 받음
      if (response.ok) {
        alert("비밀번호 재설정 이메일을 전송했습니다.");
      } else {
        alert(data || "비밀번호 재설정 요청 실패");
      }
    } catch (error) {
      console.error("비밀번호 재설정 요청 에러:", error);
      alert("서버 오류 발생");
    }
  };

  // 비밀번호 변경 요청
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordReset !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:7200/members/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword: passwordReset }),
        }
      );

      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
      } else {
        const errorText = await response.text();
        alert(`비밀번호 변경 실패: ${errorText}`);
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("서버 요청 실패");
    }
  };

  const handleLoginPage = () => {
    redirect("/");
  };

  return (
    <L.Body>
      <L.MainContainer>
        <L.Container_top>
          <h1>ID / 비밀번호 찾기</h1>
        </L.Container_top>
        <L.Container_tab>
          <button
            className={`tablinks ${activeTab === "findID" ? "active" : ""}`}
            onClick={() => handleTabClick("findID")}
            style={{ flex: 0.5, padding: "15px 0", transition: "0.5s" }}
          >
            아이디 찾기
          </button>
          <button
            className={`tablinks ${
              activeTab === "findPassword" ? "active" : ""
            }`}
            onClick={() => handleTabClick("findPassword")}
            style={{ flex: 0.5, padding: "15px 0", transition: "0.5s" }}
          >
            비밀번호 찾기
          </button>
        </L.Container_tab>
        <L.Container_bottom>
          {activeTab === "findID" && (
            <div className="tab-content active" id="findID">
              <L.P_tag>
                <strong>등록된 이메일로 ID 찾기</strong>
                <br />
                <br />
                회원님의 <strong>이름</strong>과 <strong>이메일 주소</strong>를
                입력해주세요.
              </L.P_tag>
              <form>
                <DefaultInputField
                  type="text"
                  id="name"
                  placeholder="회원 이름 (홍길동)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="email"
                  id="email"
                  placeholder="회원 이메일 (fintech123@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultButton
                  type="button"
                  onClick={() => {
                    handleRequestVerificationCode();
                    setConfirmID("");
                  }}
                  width="100%"
                  height="2.5em"
                >
                  인증번호 받기
                </DefaultButton>
                {showVerificationInput && (
                  <>
                    <L.Divider />
                    <DefaultInputField
                      type="text"
                      id="confirm-id"
                      placeholder="인증번호 입력"
                      value={confirmID}
                      onChange={(e) => setConfirmID(e.target.value)}
                      required
                    />
                    {/* 인증 버튼 */}
                    <DefaultButton
                      type="button"
                      onClick={handleVerifyCode}
                      width="100%"
                      height="2.5em"
                    >
                      인증
                    </DefaultButton>
                  </>
                )}
              </form>
              {showID && (
                <>
                  <L.Divider />
                  <L.P_tag
                    style={{
                      textAlign: "center",
                      margin: "0",
                      paddingBottom: "20px",
                    }}
                  >
                    회원님의 ID는{" "}
                    <strong style={{ color: "black" }}>{foundID}</strong>{" "}
                    입니다.
                  </L.P_tag>{" "}
                  <DefaultButton
                    type="submit"
                    width="100%"
                    height="2.5em"
                    onClick={handleLoginPage}
                  >
                    로그인 하러가기
                  </DefaultButton>
                </>
              )}
            </div>
          )}
          {activeTab === "findPassword" && (
            <div className="tab-content active" id="findPassword">
              <L.P_tag>
                <strong>등록된 이메일로 비밀번호 찾기</strong>
                <br />
                <br />
                회원님의 <strong>이름</strong>과 <strong>이메일 주소</strong>를
                입력해주세요.
              </L.P_tag>
              <form onSubmit={handleFindPasswordSubmit}>
                <DefaultInputField
                  type="text"
                  id="name"
                  placeholder="회원 이름 (홍길동)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <DefaultInputField
                  type="email"
                  id="emailforpassword"
                  placeholder="회원 이메일 (fintech123@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultButton
                  type="button"
                  width="100%"
                  height="2.5em"
                  onClick={() => {
                    handleRequestVerificationCode();
                    setConfirmID("");
                  }}
                >
                  인증번호 받기
                </DefaultButton>
                {showVerificationInput && (
                  <>
                    <L.Divider />
                    <DefaultInputField
                      type="text"
                      id="confirm-id"
                      placeholder="인증번호 입력"
                      value={confirmID}
                      onChange={(e) => setConfirmID(e.target.value)}
                      required
                    />
                    {/* 인증 버튼 */}
                    <DefaultButton
                      type="button"
                      onClick={handleVerifyCode}
                      width="100%"
                      height="2.5em"
                    >
                      인증
                    </DefaultButton>
                  </>
                )}
                {showPwdReset && (
                  <>
                    <L.Divider />
                    <DefaultInputField
                      type="password"
                      id="passwordreset"
                      placeholder="비밀번호 입력"
                      value={passwordReset}
                      onChange={(e) => setPasswordReset(e.target.value)}
                      required
                    />
                    <DefaultInputField
                      type="password"
                      id="passwordcheck"
                      placeholder="비밀번호 확인"
                      value={passwordCheck}
                      onChange={(e) => setPasswordCheck(e.target.value)}
                      required
                    />
                    <DefaultButton
                      type="button"
                      onClick={handleResetPassword}
                      width="100%"
                      height="2.5em"
                    >
                      비밀번호 재설정
                    </DefaultButton>
                  </>
                )}
              </form>
            </div>
          )}
        </L.Container_bottom>
        <L.SignUp>
          <L.P_tag>
            <a href="/login">로그인</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} style={{ marginLeft: "20px" }} />
          <L.P_tag style={{ margin: "20px" }}>
            <a href="/">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default FindIDPage;
