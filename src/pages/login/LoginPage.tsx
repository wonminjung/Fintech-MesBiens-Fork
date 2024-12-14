import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "./LoginStyle";
import DefaultButton from "../../components/button/DefaultButton";
import DefaultInputField from "../../components/inputfield/InputField";
import VerticalDivider from "../../components/divider/VerticalDivider";
import { useCookies } from "react-cookie";
import { useAuth } from "../../lib/AuthContext";

const LoginPage: React.FC = () => {
  const { setUserID } = useAuth(); // Context에서 setUserID 가져오기
  const [loginForm, setLoginForm] = useState<{
    userID: string;
    userPassword: string;
  }>({
    userID: "",
    userPassword: "",
  });

  /* 아이디 기억하기 */
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUserID"]);

  useEffect(() => {
    if (cookies.rememberUserID !== undefined) {
      setLoginForm((prevState) => ({
        ...prevState,
        userID: cookies.rememberUserID,
      }));
      setIsRemember(true);
    }
  }, [cookies.rememberUserID]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 체크박스 상태 업데이트
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      // 쿠키에 userID 값 저장, 유효기간 2000초
      setCookie("rememberUserID", loginForm.userID, { maxAge: 2000 });
    } else {
      // 체크 안 되어 있으면 쿠키 삭제
      removeCookie("rememberUserID");
    }
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState<string>("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { userID, userPassword } = loginForm;

    if (userID === "" || userPassword === "") {
      setErrors("ID 또는 비밀번호를 입력해 주세요!.");
    } else if (userID !== "user") {
      setErrors("ID가 일치하지 않습니다.");
    } else if (userPassword !== "0000") {
      setErrors("비밀번호가 일치하지 않습니다.");
    } else {
      // 유효성 통과 시
      console.log("아이디 : " + userID);
      console.log("비밀번호 : " + userPassword);
      alert("로그인 성공");

      // userID를 Context에 저장
      setUserID(userID);

      // 로그인 처리 후 상태 초기화
      setLoginForm({ userID: "", userPassword: "" });
      setErrors("");

      navigate("/main");
    }
  };

  return (
    <L.Body>
      <L.MainContainer>
        <L.Container_top>
          <h1 style={{ fontSize: "3em" }}>로그인</h1>
        </L.Container_top>
        <L.Container_bottom>
          <L.P_tag>회원 ID와 비밀번호를 입력하세요.</L.P_tag>
          <form method="post" onSubmit={handleLogin}>
            <DefaultInputField
              id="userID"
              placeholder="회원 ID (fintech123)"
              // required
              value={loginForm.userID}
              onChange={(e) =>
                setLoginForm({ ...loginForm, userID: e.target.value })
              }
            />
            <br />
            <DefaultInputField
              type="password"
              id="password"
              placeholder="비밀번호 (123456)"
              // required
              value={loginForm.userPassword}
              onChange={(e) =>
                setLoginForm({ ...loginForm, userPassword: e.target.value })
              }
            />
            <L.RememberMe
              type="checkbox"
              onChange={handleOnChange}
              checked={isRemember}
            />
            <label htmlFor="remember">ID 기억하기</label>
            {errors && <div style={{ color: "red" }}>{errors}</div>}
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
          <L.P_tag>
            <a href="/signup">회원가입</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} margin={"20px"} />
          <L.P_tag>
            <a href="/findID">아이디/비밀번호 찾기</a>
          </L.P_tag>
          <VerticalDivider height={"20px"} style={{ marginLeft: "20px" }} />
          <L.P_tag style={{ margin: "20px" }}>
            <a href="/intro">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default LoginPage;
