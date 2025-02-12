import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules/store/store";
import { login } from "../../modules/user/userSlice"; // Redux 액션 추가
import L from "./LoginStyle";
import DefaultButton from "../../components/button/DefaultButton";
import DefaultInputField from "../../components/inputfield/InputField";
import VerticalDivider from "../../components/divider/VerticalDivider";
import ModalFunc from "../../components/modal/utils/ModalFunc";
import { ModalKeys } from "../../components/modal/keys/ModalKeys";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { handleModal } = ModalFunc();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [cookies, setCookie] = useCookies(["jwtToken", "rememberMe"]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { member } = useSelector((state: RootState) => state.user);

  //removeCookie
  useEffect(() => {
    if (cookies.rememberMe) {
      setLoginForm((prevForm) => ({ ...prevForm, userID: cookies.rememberMe }));
      setRememberMe(true);
    }
  }, [cookies.rememberMe]);

  // 로그인 요청 함수
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors("");

    const { username, password } = loginForm;

    if (!username || !password) {
      setErrors("ID 또는 비밀번호를 입력해 주세요!");
      return;
    }

    try {
      const response = await fetch("http://localhost:7200/members/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: username, password: password }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "로그인 실패");
      }

      // JWT 토큰 저장
      setCookie("jwtToken", result.token, { path: "/", maxAge: 3600 });

      // Redux에 사용자 정보 저장
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
                token: result.token,
                isAuthenticated: true,
              })
            );

      // 로그인 성공 처리
      handleModal(ModalKeys.LOGIN_SUCCESS);
      navigate("/main");
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
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
              type="text"
              id="username"
              name="username"
              placeholder="회원 ID"
              value={loginForm.username}
              onChange={handleChange}
              required
            />
            <br />
            <DefaultInputField
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
            <L.RememberMe
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckbox}
            />
            <label>ID 기억하기</label>
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
            <a href="/">홈으로</a> 나가기
          </L.P_tag>
        </L.SignUp>
      </L.MainContainer>
    </L.Body>
  );
};

export default LoginPage;
