import React, { useEffect, useState } from "react";
import { I, M } from "./style";
// import L from "../login/LoginStyle";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import DefaultButton from "../../components/button/DefaultButton";
import VerticalDivider from "../../components/divider/VerticalDivider";
import DefaultInputField from "../../components/inputfield/InputField";
import { ModalKeys } from "../../components/modal/keys/ModalKeys";
import ModalFunc from "../../components/modal/utils/ModalFunc";
import { RootState } from "../../modules/store/store";
import { login } from "../../modules/user/userSlice"; // login 액션 가져오기
import Carousel from "./carousel/Carousel";

const IntroPageBeforeLogin: React.FC = () => {
  const { handleModal } = ModalFunc();
  const [loginForm, setLoginForm] = useState({
    userID: "",
    userPassword: "",
  });

  const [cookies, setCookie, removeCookie] = useCookies<string>([
    "userID",
    "rememberMe",
  ]);
  const [errors, setErrors] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (cookies.rememberMe) {
      setLoginForm((prevForm) => ({
        ...prevForm,
        userID: cookies.rememberMe,
      }));
      setRememberMe(true);
    }
  }, [cookies.rememberMe]);

  const HandleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const { userID, userPassword } = loginForm;

    // ID 또는 비밀번호가 빈 값이면 에러 메시지 설정
    if (userID === "" || userPassword === "") {
      setErrors("ID 또는 비밀번호를 입력해 주세요!");
      return;
    }

    try {
      // 서버에 로그인 요청
      const response = await fetch("http://localhost:7200/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함 요청 설정

        body: JSON.stringify({
          memberId: userID,
          password: userPassword,
        }),
      });


      // 응답이 성공적이지 않으면 에러 던지기
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 응답을 JSON으로 파싱하여 처리
      const result = await response.json();

      // Redux에 로그인 정보 저장
      dispatch(
        login({
          member: {
            memberNo: result.memberNo,
            memberId: result.memberId,
            memberName: result.memberName,
            memberEmail: result.memberEmail,
            memberPhone: result.memberPhone,
            memberAddress: result.memberAddress,
            memberBirth: result.memberBirth,
            memberProfile: result.memberProfile,
          },
          isAuthenticated: true,
        })
      );
      // 로그인 성공 모달 띄우기
      handleModal(ModalKeys.LOGIN_SUCCESS);

      // 쿠키에 사용자 ID 저장
      setCookie("userID", userID, { maxAge: 30 * 24 * 60 * 60 });

      // "Remember Me" 체크 여부에 따라 쿠키 설정
      if (rememberMe) {
        setCookie("rememberMe", userID, { maxAge: 30 * 24 * 60 * 60 });
      } else {
        removeCookie("rememberMe");
      }
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <M.MainContainer>
      <M.LeftAreaContainer>
        <Carousel />
      </M.LeftAreaContainer>
      <div style={{ alignContent: "center" }}>
        <VerticalDivider height="90%" />
      </div>
      <M.LoginContainer>
        <I.Container_top>
          <h1
            style={{
              fontSize: "3em",
              margin: "0 0 40px 0",
              padding: "20px",
            }}
          >
            Login
          </h1>
        </I.Container_top>
        <I.Container_bottom>
          <I.P_tag>회원 ID와 비밀번호를 입력하세요.</I.P_tag>
          <form onSubmit={HandleLogin}>
            <DefaultInputField
              id="username"
              placeholder="회원 ID"
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
              placeholder="비밀번호"
              // required
              value={loginForm.userPassword}
              onChange={(e) =>
                setLoginForm({ ...loginForm, userPassword: e.target.value })
              }
            />
            <I.RememberMe
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckbox}
            />
            <label htmlFor="remember">ID 기억하기</label>
            {errors && <div style={{ color: "red" }}>{errors}</div>}
            <DefaultButton width="100%">Login</DefaultButton>
          </form>
          <I.SignUp>
            <a href="/signup">회원가입</a>
            <a href="findID">아이디/비밀번호 찾기</a>
          </I.SignUp>
        </I.Container_bottom>
      </M.LoginContainer>
    </M.MainContainer>
  );
};
export default IntroPageBeforeLogin;
